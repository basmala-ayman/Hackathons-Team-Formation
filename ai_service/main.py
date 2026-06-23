import torch
import numpy as np
import pandas as pd
import json
from fastapi import FastAPI, HTTPException, Body
from contextlib import asynccontextmanager
from pydantic import BaseModel
from typing import List

import text_processor
import greedy_algorithm
from hops_models import OneHopModule, TwoHopModule, expand_embedding_layer

state = {}
device = torch.device("mps" if torch.backends.mps.is_available() else ("cuda" if torch.cuda.is_available() else "cpu"))

class StatusResponse(BaseModel):
    memory_wiped: bool
    total_members: int
    total_projects: int

class MemberSyncRequest(BaseModel):
    id: int
    bio: str
    skills: list
    past_teammate_ids: List[int] = []
    past_team_ids: List[int] = []

class SyncResponseData(BaseModel):
    synced_id: int

class SyncResponse(BaseModel):
    success: bool
    data: SyncResponseData

class ProjectSyncRequest(BaseModel):
    id: int
    tags: list

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

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"🚀 Initializing Dynamic AI Service on {device}...")

    with open("models/word2id.json", "r") as f:
        state["word2id"] = json.load(f)
    with open("models/label2id.json", "r") as f:
        state["label2id"] = json.load(f)

    # Load One-Hop Baseline checkpoint
    weights_path = "models/trained_onehop_weights.pt"
    state_dict = torch.load(weights_path, map_location=device)

    # EXTRACT DYNAMIC MATRIX DIMENSIONS FROM CHEKPOINT
    trained_word_size = state_dict["text.word_emb.weight"].shape[0]
    trained_label_size = state_dict["text.label_emb.weight"].shape[0]
    num_devs_trained = state_dict['dev_id.weight'].shape[0]
    num_tasks_trained = state_dict['task_id.weight'].shape[0]

    current_word_size = len(state["word2id"])
    current_label_size = len(state["label2id"])

    # Instantiate Module to original baseline size
    state["encoder"] = OneHopModule(
        word_vocab_size=trained_word_size,
        label_vocab_size=trained_label_size,
        num_devs=num_devs_trained,
        num_tasks=num_tasks_trained,
    )
    state["encoder"].load_state_dict(state_dict, strict=True)

    # DYNAMIC EXTENSION UPGRADE LOGIC FOR PRODUCTION ENVIRONMENT
    if current_word_size > trained_word_size:
        print(f"🔄 Growing word embedding layer to {current_word_size}")
        state["encoder"].text.word_emb = expand_embedding_layer(state["encoder"].text.word_emb, current_word_size)
        
    if current_label_size > trained_label_size:
        print(f"🔄 Growing label embedding layer to {current_label_size}")
        state["encoder"].text.label_emb = expand_embedding_layer(state["encoder"].text.label_emb, current_label_size)

    state["encoder"] = state["encoder"].to(device)
    state["encoder"].eval()

    # Active Live RAM Pools
    state["live_member_embs"] = [] 
    state["live_member_ids"] = []  

    # Load Two-Hop Baseline Checkpoint
    two_hop_weights_path = "models/trained_twohop_weights.pt"
    two_hop_state = torch.load(two_hop_weights_path, map_location=device)

    with torch.no_grad():
        raw_user_ids = state["encoder"].dev_id.weight  # Shape: [num_devs_trained, 64]
        raw_proj_ids = state["encoder"].task_id.weight  # Shape: [num_tasks_trained, 64]

        # Calculate exact semantic dimension delta dynamically
        semantic_dim = state["encoder"].dev_proj.weight.shape[1] - state["encoder"].d_id # e.g. 704 - 64 = 640
        
        user_zeros = torch.zeros((raw_user_ids.shape[0], semantic_dim)).to(device)
        proj_zeros = torch.zeros((raw_proj_ids.shape[0], semantic_dim)).to(device)

        user_input = torch.cat([raw_user_ids, user_zeros], dim=1).contiguous()
        proj_input = torch.cat([raw_proj_ids, proj_zeros], dim=1).contiguous()

        full_user_embs = state["encoder"].dev_proj(user_input)
        full_proj_embs = state["encoder"].task_proj(proj_input)
        
    state["two_hop"] = TwoHopModule(
        onehop_user_embs=full_user_embs.cpu().numpy(),
        onehop_proj_embs=full_proj_embs.cpu().numpy(),
        common_dim=256
    )

    # --- POP BASE OVERWRITE KEYS AND APPLY STRICT=FALSE FOR EXTENSION LAYERS ---
    two_hop_state.pop("base_user_lookup.weight", None)
    two_hop_state.pop("base_proj_lookup.weight", None)
    
    state["two_hop"].load_state_dict(two_hop_state, strict=False)
    state["two_hop"] = state["two_hop"].to(device)
    state["two_hop"].eval()

    state["live_past_team_embs"] = [] 
    state["live_past_team_ids"] = []  

    yield 
    state.clear()

app = FastAPI(lifespan=lifespan)

def generate_member_emb(bio: str, skills: list):
    tokens = text_processor.tokenize_words(bio)
    word_ids = [state["word2id"].get(t, 1) for t in tokens]
    clean_lbls = [text_processor.clean_label(s) for s in skills]
    label_ids = [state["label2id"].get(l, 1) for l in clean_lbls]

    word_ids, word_mask = word_ids[:120], [1]*len(word_ids[:120])
    label_ids, label_mask = label_ids[:40], [1]*len(label_ids[:40])

    while len(word_ids) < 120: word_ids.append(0); word_mask.append(0)
    while len(label_ids) < 40: label_ids.append(0); label_mask.append(0)

    with torch.no_grad():
        word_tensor = torch.tensor([word_ids], dtype=torch.long).to(device)
        word_mask_tensor = torch.tensor([word_mask], dtype=torch.bool).to(device)
        label_tensor = torch.tensor([label_ids], dtype=torch.long).to(device)
        label_mask_tensor = torch.tensor([label_mask], dtype=torch.bool).to(device)

        sem_vec = state["encoder"].text.encode_member(word_tensor, word_mask_tensor, label_tensor, label_mask_tensor)

        # FIXED: Explicit float32 type assignment prevents hardware matrix precision crashes
        id_zeros = torch.zeros((1, state["encoder"].d_id), dtype=torch.float32).to(device)
        vector = state["encoder"].dev_proj(torch.cat([id_zeros, sem_vec], dim=1))

    return vector.cpu().squeeze().numpy()

def generate_project_emb(tags: list):
    clean_tags = [text_processor.clean_label(s) for s in tags]
    tag_ids = [state["label2id"].get(s, 1) for s in clean_tags]

    tag_ids = tag_ids[:20]
    tag_mask = [1] * len(tag_ids)

    word_ids = [0] * 40
    word_mask = [0] * 40
    while len(tag_ids) < 20: tag_ids.append(0); tag_mask.append(0)
    
    with torch.no_grad():
        word_tensor = torch.tensor([word_ids], dtype=torch.long).to(device)
        word_mask_tensor = torch.tensor([word_mask], dtype=torch.bool).to(device)
        label_tensor = torch.tensor([tag_ids], dtype=torch.long).to(device)
        label_mask_tensor = torch.tensor([tag_mask], dtype=torch.bool).to(device)

        sem_vec = state["encoder"].text.encode_project(word_tensor, word_mask_tensor, label_tensor, label_mask_tensor)
        
        # FIXED: Explicit float32 type assignment prevents hardware matrix precision crashes
        id_zeros = torch.zeros((1, state["encoder"].d_id), dtype=torch.float32).to(device)
        vector = state["encoder"].task_proj(torch.cat([id_zeros, sem_vec], dim=1))

    return vector.cpu().squeeze().numpy()

def refine_with_history(base_vec, teammate_ids, project_ids):
    """
    Refines a One-Hop vector using Two-Hop attention over past history.
    """
    member_base = torch.tensor([base_vec]).to(device)

    # Find teammate vectors in our live memory
    teammate_embs = [state["live_member_embs"][state["live_member_ids"].index(tid)]
                     for tid in teammate_ids if tid in state["live_member_ids"]]
    
    # Find project/team vectors in our live memory
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
            # FIX: Fall back to member_base instead of zeros to maintain distribution alignment
            member_ctx2 = member_base
        
        # Handle Project Context (member_ctx1)
        if project_embs:
            p_mat = torch.from_numpy(np.stack(project_embs)).unsqueeze(0).to(device).float()
            p_mask = torch.ones((1, len(project_embs)), dtype=torch.bool).to(device)
            member_ctx1 = state["two_hop"].user_attn_1(member_base, p_mat, p_mask)
        else:
            # FIX: Fall back to member_base instead of zeros to maintain distribution alignment
            member_ctx1 = member_base
        
        # Natively concatenate u_base, user_ctx1 (project context), and user_ctx2 (teammate context)
        fused_input = torch.cat([member_base, member_ctx1, member_ctx2], dim=1)
        member_final = torch.tanh(state["two_hop"].user_fuse(fused_input))

        return member_final.cpu().squeeze().numpy()

@app.get("/status", response_model=StatusResponse)
async def get_status():
    return {
        "memory_wiped": len(state["live_member_ids"]) == 0,
        "total_members": len(state["live_member_ids"]),
        "total_projects": len(state["live_past_team_ids"])
    }

@app.post("/sync/member", response_model=SyncResponse)
async def sync_member(data: MemberSyncRequest):
    db_id = data.id
    vector = generate_member_emb(data.bio, data.skills)

    if data.past_teammate_ids or data.past_team_ids:
        vector = refine_with_history(vector, data.past_teammate_ids, data.past_team_ids)

    if db_id in state["live_member_ids"]:
        idx = state["live_member_ids"].index(db_id)
        state["live_member_embs"][idx] = vector
    else:
        state["live_member_embs"].append(vector)
        state["live_member_ids"].append(db_id)

    return {"success": True, "data": {"synced_id": db_id}}

@app.post("/sync/project", response_model=SyncResponse)
async def sync_project(data: ProjectSyncRequest):
    db_id = data.id
    vector = generate_project_emb(data.tags)

    if db_id in state["live_past_team_ids"]:
        idx = state["live_past_team_ids"].index(db_id)
        state["live_past_team_embs"][idx] = vector
    else:
        state["live_past_team_embs"].append(vector)
        state["live_past_team_ids"].append(db_id)
    
    return {"success": True, "data": {"synced_id": db_id}}

@app.post("/recommend", response_model=RecommendResponse)
async def recommend(data: RecommendRequest):
    project_id = data.project_id
    project_emb = generate_project_emb(data.tags)

    filtered_embs = []
    filtered_ids = []
    search_set = set(data.search_member_ids)

    for i, db_id in enumerate(state["live_member_ids"]):
        if db_id in search_set:
            filtered_embs.append(state["live_member_embs"][i])
            filtered_ids.append(db_id)
    
    if not filtered_embs:
        raise HTTPException(status_code=400, detail="None of the search_member_ids were found in AI memory.")
    
    member_matrix = np.array(filtered_embs)
    member_id2idx = {mid: i for i, mid in enumerate(filtered_ids)}
    pinned_idx = greedy_algorithm.resolve_pinned_members(data.pinned_member_ids, member_id2idx)

    # --- FIX 1: PASS TARGET PROJECT EMBEDDING AS A 2D NUMPY MATRIX ---
    # Wrap project_emb into a proper 2D array structure [1, 256] matching your training expectations
    project_matrix_input = np.array([project_emb])

    A, score_dict = greedy_algorithm.build_candidate_set_A_optimized(
        0, project_matrix_input, member_matrix, data.team_size, b=12, pinned=pinned_idx
    )

    topK_indices = greedy_algorithm.greedy_beam_search(
        A, member_matrix, data.team_size, K=12, alpha=0.9, score_dict=score_dict, pinned=pinned_idx
    )

    diverse_indices = greedy_algorithm.select_top_diverse_teams(topK_indices, 3)

    final_teams = []
    for team in diverse_indices:
        final_teams.append([filtered_ids[i] for i in team])

    return {
        "success": True,
        "data": {
            "project_id": project_id,
            "recommended_teams": final_teams
        }
    }