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


# This dictionary holds everything in RAM for speed
state = {}
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")


# Format for the Sync Response
class MemberSyncRequest(BaseModel):
    id: int
    bio: str
    skills: list

class SyncResponseData(BaseModel):
    synced_id: int

class SyncResponse(BaseModel):
    success: bool
    data: SyncResponseData

# Format for the Recommendation Response
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
    weights_path = "models/trained_one_hop_weights.pt"
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


@app.post("/sync/member", response_model=SyncResponse)
async def sync_member(data: MemberSyncRequest):
    """Syncs a real database user into the AI search pool."""
    
    db_id = data.id
    bio = data.bio
    skills = data.skills

    # Generate their mathematical 'identity'
    vector = generate_member_emb(bio, skills)

    # If the user already exists in our pool, update them. Otherwise, add them.
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

@app.post("/recommend", response_model=RecommendResponse)
async def recommend(
    data: RecommendRequest
):
    
    project_id = data.project_id
    tags = data.tags
    search_member_ids = data.search_member_ids
    team_size = data.team_size
    pinned_member_ids = data.pinned_member_ids

    project_emb = generate_project_emb(tags)

    filtered_embs = []
    filtered_ids = []
    for i, id in enumerate(state["live_member_ids"]):
        if id in search_member_ids:
            filtered_embs.append(state["live_member_embs"][i])
            filtered_ids.append(id)
    
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