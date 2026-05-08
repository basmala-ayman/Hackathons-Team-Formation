import torch
import numpy as np
import pandas as pd
import json
from fastapi import FastAPI, HTTPException, Body
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List

# Import your custom files
import text_processor
from hops_models import OneHopModule
import greedy_algorithm
from hops_models import TwoHopModule


# This dictionary holds everything in RAM for speed
state = {}
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


# Format for the Sync Member
class MemberSyncRequest(BaseModel):
    id: int
    bio: str
    skills: list
    # for two-hop model
    past_teammate_ids: List[int] = []
    past_team_ids: List[int] = []

class SyncResponseData(BaseModel):
    synced_id: int

class SyncResponse(BaseModel):
    success: bool
    data: SyncResponseData

# Format for the Sync Project
class ProjectSyncRequest(BaseModel):
    id: int
    tags: list

# Format for the Recommendation
class RecommendRequest(BaseModel):
    project_id: int
    tags: list
    search_member_ids: list
    team_size: int = 4
    pinned_member_ids: list = []

class RecommendResponseData(BaseModel):
    project_id: int
    recommended_teams: List[List[int]]

class RecommendResponse(BaseModel):
    success: bool
    data: RecommendResponseData


## Lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"🚀 Initializing AI Service on {device}...")

    with open("models/word2id.json", "r") as f:
        state["word2id"] = json.load(f)
    with open("models/label2id.json", "r") as f:
        state["label2id"] = json.load(f)

    # one-hop weights
    weights_path = "models/trained_onehop_weights.pt"
    state_dict = torch.load(weights_path, map_location=device)

    num_devs_trained = state_dict['dev_id.weight'].shape[0]
    num_tasks_trained = state_dict['task_id.weight'].shape[0]

    state["encoder"] = OneHopModule(
        word_vocab_size=len(state["word2id"]),
        label_vocab_size=len(state["label2id"]),
        num_devs=num_devs_trained,
        num_tasks=num_tasks_trained,
    ).to(device)

    state["encoder"].load_state_dict(state_dict)
    state["encoder"].eval()

    # 4. Initialize our REAL USER POOL (Empty at start)
    state["live_member_embs"] = [] # Store 256D vectors here
    state["live_member_ids"] = []  # Store PostgreSQL IDs here

    # two-hop weights
    two_hop_weights_path = "models/trained_twohop_weights.pt"
    # Load once
    two_hop_state = torch.load(two_hop_weights_path, map_location=device)

    with torch.no_grad():
        # 1. Get raw 64D ID weights from the state_dict
        raw_user_ids = state_dict['dev_id.weight']  # Shape: [38462, 64]
        raw_proj_ids = state_dict['task_id.weight'] # Shape: [18569, 64]

        # 2. FIX: Change 192 to 640 to reach the 704 input size (64 + 640 = 704)
        user_zeros = torch.zeros((num_devs_trained, 640)).to(device)
        proj_zeros = torch.zeros((num_tasks_trained, 640)).to(device)

        # 3. Concatenate and make 'contiguous' for the Apple M2 GPU
        user_input = torch.cat([raw_user_ids, user_zeros], dim=1).contiguous()
        proj_input = torch.cat([raw_proj_ids, proj_zeros], dim=1).contiguous()

        # 4. Project them into the 256D common space
        full_user_embs = state["encoder"].dev_proj(user_input)
        full_proj_embs = state["encoder"].task_proj(proj_input)
        
    state["two_hop"] = TwoHopModule(
        onehop_user_embs=full_user_embs.cpu().numpy(),
        onehop_proj_embs=full_proj_embs.cpu().numpy(),
        common_dim=256
    ).to(device)

    # Now load the state into the initialized module
    state["two_hop"].load_state_dict(two_hop_state)
    state["two_hop"].eval()
    # state["two_hop"] = TwoHopModule(
    #     onehop_user_embs=state_dict['dev_id.weight'].cpu().numpy(),
    #     onehop_proj_embs=state_dict['task_id.weight'].cpu().numpy(),
    #     common_dim=256
    # ).to(device)

    state["two_hop"].load_state_dict(two_hop_state)
    state["two_hop"].eval()

    # 4. Initialize our REAL history of teams POOL (Empty at start)
    state["live_past_team_embs"] = [] # Store 256D vectors here
    state["live_past_team_ids"] = []  # Store PostgreSQL IDs here

    yield # server is now running
    state.clear()

app = FastAPI(lifespan=lifespan)


def generate_member_emb(bio: str, skills: list):
    """Turns a member's bio and skills into a 256D vector."""
    tokens = text_processor.tokenize_words(bio)
    word_ids = [state["word2id"].get(t, 1) for t in tokens]
    clean_lbls = [text_processor.clean_label(s) for s in skills]
    label_ids = [state["label2id"].get(l, 1) for l in clean_lbls]

    # Limits for members
    word_ids, word_mask = word_ids[:120], [1]*len(word_ids[:120])
    label_ids, label_mask = label_ids[:40], [1]*len(label_ids[:40])

    while len(word_ids) < 120: word_ids.append(0); word_mask.append(0)
    while len(label_ids) < 40: label_ids.append(0); label_mask.append(0)

    with torch.no_grad():
        word_tensor = torch.tensor([word_ids]).to(device)
        word_mask_tensor = torch.tensor([word_mask],dtype=torch.bool).to(device)
        label_tensor = torch.tensor([label_ids]).to(device)
        label_mask_tensor = torch.tensor([label_mask],dtype=torch.bool).to(device)

        sem_vec = state["encoder"].text.encode_member(word_tensor, word_mask_tensor, label_tensor, label_mask_tensor)
        id = torch.zeros((1, 64)).to(device)
        vector = state["encoder"].dev_proj(torch.cat([id, sem_vec], dim=1))
    return vector.cpu().squeeze().numpy()


def generate_project_emb(tags: list):
    """Turns a project's tags into a 256D vector."""
    clean_tags = [text_processor.clean_label(s) for s in tags]
    tag_ids = [state["label2id"].get(s, 1) for s in clean_tags]

    tag_ids = tag_ids[:20]
    tag_mask = [1] * len(tag_ids)

    word_ids = [0] * 40
    word_mask = [0] * 40
    
    while len(tag_ids) < 20:
        tag_ids.append(0)
        tag_mask.append(0)
    
    with torch.no_grad():
        word_tensor = torch.tensor([word_ids]).to(device)
        word_mask_tensor = torch.tensor([word_mask],dtype=torch.bool).to(device)
        label_tensor = torch.tensor([tag_ids]).to(device)
        label_mask_tensor = torch.tensor([tag_mask],dtype=torch.bool).to(device)

        sem_vec = state["encoder"].text.encode_project(word_tensor, word_mask_tensor, label_tensor, label_mask_tensor)
        db_id = torch.zeros((1, 64)).to(device)
        vector = state["encoder"].task_proj(torch.cat([db_id, sem_vec], dim=1))
    return vector.cpu().squeeze().numpy()


def refine_with_history(base_vec, teammate_ids, project_ids):
    """
    Refines a One-Hop vector using Two-Hop attention over past history.
    """

    # convert base vector to tensor
    member_base = torch.tensor([base_vec]).to(device)

    # find teammate vectors in our live memory
    teammate_embs = [state["live_member_embs"][state["live_member_ids"].index(tid)]
                     for tid in teammate_ids if tid in state["live_member_ids"]]
    
    # find project/team vectors in our live memory
    project_embs = [state["live_past_team_embs"][state["live_past_team_ids"].index(pid)]
                    for pid in project_ids if pid in state["live_past_team_ids"]]
    
    if not teammate_embs and not project_embs:
        return base_vec
    
    with torch.no_grad():
        # Handle Teammate Context (member_ctx2)
        if teammate_embs:
            t_mat = torch.from_numpy(np.stack(teammate_embs)).unsqueeze(0).to(device).float()
            t_mask = torch.ones((1, len(teammate_embs)), dtype=torch.bool).to(device)
            member_ctx2 = state["two_hop"].user_attn_2(member_base, t_mat, t_mask)
        else:
            member_ctx2 = member_base
        
        # Handle Project Context (member_ctx1)
        if project_embs:
            p_mat = torch.from_numpy(np.stack(project_embs)).unsqueeze(0).to(device).float()
            p_mask = torch.ones((1, len(project_embs)), dtype=torch.bool).to(device)
            member_ctx1 = state["two_hop"].user_attn_1(member_base, p_mat, p_mask)
        else:
            member_ctx1 = member_base
        
        # Fusion: Combine [member's profile + Project History + Teammate History]
        # We pass member_base twice as per your TwoHopModule fuse signature
        member_final, _ = state["two_hop"].fuse(
            member_base, member_base,
            member_ctx1, member_ctx2,
            member_ctx1, member_ctx2)

        return member_final.cpu().squeeze().numpy()


@app.post("/sync/member", response_model=SyncResponse)
async def sync_member(data: MemberSyncRequest):
    """Syncs a real database user into the AI search pool."""
    
    db_id = data.id
    bio = data.bio
    skills = data.skills
    past_teammate_ids = data.past_teammate_ids
    past_team_ids = data.past_team_ids

    # Generate their mathematical 'identity'
    vector = generate_member_emb(bio, skills)

    if past_teammate_ids or past_team_ids:
        vector = refine_with_history(vector, past_teammate_ids, past_team_ids)

    if db_id in state["live_member_ids"]:
        idx = state["live_member_ids"].index(db_id)
        state["live_member_embs"][idx] = vector
    else:
        state["live_member_embs"].append(vector)
        state["live_member_ids"].append(db_id)

    return {
        "success": True,
        "data": {
            "synced_id": db_id
        }
    }


@app.post("/sync/project", response_model=SyncResponse)
async def sync_project(data: ProjectSyncRequest):
    db_id = data.id
    tags = data.tags

    vector = generate_project_emb(tags)

    if db_id in state["live_past_team_ids"]:
        idx = state["live_past_team_ids"].index(db_id)
        state["live_past_team_embs"][idx] = vector
    else:
        state["live_past_team_embs"].append(vector)
        state["live_past_team_ids"].append(db_id)
    
    return {
        "success": True,
        "data": {
            "synced_id": db_id
        }
    }


@app.post("/recommend", response_model=RecommendResponse)
async def recommend(
    data: RecommendRequest
):
    
    project_id = data.project_id
    tags = data.tags
    search_member_ids = set(data.search_member_ids)
    team_size = data.team_size
    pinned_member_ids = data.pinned_member_ids

    project_emb = generate_project_emb(tags)

    filtered_embs = []
    filtered_ids = []

    for i, db_id in enumerate(state["live_member_ids"]):
        if db_id in search_member_ids:
            filtered_embs.append(state["live_member_embs"][i])
            filtered_ids.append(db_id)
    
    if not filtered_embs:
        raise HTTPException(status_code=400, detail="None of the search_member_ids were found in AI memory.")
    
    member_matrix = np.array(filtered_embs)

    # 3. Handle Pinned Members (Convert filtered DB IDs to local indices)
    # Mapping is now based on the FILTERED list

    member_id2idx = {mid: i for i, mid in enumerate(filtered_ids)}
    
    pinned_idx = greedy_algorithm.resolve_pinned_members(pinned_member_ids, member_id2idx)

    # 4. Build Candidate Pool & Run Search
    # We pass 'filtered_db_ids' length to build_candidate_set
    A, score_dict = greedy_algorithm.build_candidate_set_A_optimized(
        0,
        [project_emb],
        member_matrix,
        team_size,
        b=12,
        pinned=pinned_idx
    )

    topK_indices = greedy_algorithm.greedy_beam_search(
        A,
        member_matrix,
        team_size,
        K=12,
        alpha=0.9,
        score_dict=score_dict,
        pinned=pinned_idx
    )

    diverse_indices = greedy_algorithm.select_top_diverse_teams(topK_indices, 3)

    final_teams = []
    for team in diverse_indices:
        final_teams.append([filtered_ids[i] for i in team])  # Convert local indices back to DB IDs

    return{
        "success": True,
        "data": {
            "project_id": project_id,
            "recommended_teams": final_teams
        }
    }