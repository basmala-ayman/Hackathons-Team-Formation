import numpy as np


# Generate Sigmoid function
def sigmoid(x):
    return 1 / (1 + np.exp(-x))


# Generate relevance (sim & y) function of single embedding
def y(project_emb, member_emb):
    # Eq. (20): y(v,u) = σ(e_v^T e_u)
    #fix div
    dot_prod = np.dot(project_emb, member_emb)
    return sigmoid(dot_prod / 16.0)


# Generate candidate set (pool) of A
def build_candidate_set_A_optimized(target_task_index, emb_task, emb_dev, k, b, pinned=None):
    target_task_emb = emb_task[target_task_index]

    # VECTORIZATION: Calculate all 33,621 dot products instantly
    # emb_dev has shape (33621, 256), target_task_emb has shape (256,)
    # The result is an array of 33,621 raw dot products.
    all_dot_products = np.dot(emb_dev, target_task_emb)

    # Apply the scaling and sigmoid to the entire array at once
    all_scores = sigmoid(all_dot_products / 16.0)

    # Create the score_dict using a fast dictionary comprehension
    score_dict = {i: score for i, score in enumerate(all_scores)}

    # Sort and pick the top b * k
    sorted_items = sorted(score_dict.items(), key=lambda x: x[1], reverse=True)
    top_n = int(b * k)
    top = sorted_items[:top_n]

    A = [m_index for (m_index, _) in top]
    # Even if a pinned member scored below the b*k threshold, they MUST be
    # in A so greedy_beam_search can place them and compute diversity correctly.

    if pinned:
      pinned_set= set(pinned)
      existing = set(A)
      missing= pinned_set - existing
      if missing:
        A= list(missing)+A

    return A, score_dict


# Generate s_relevance function (relevance of task v and subset A(k))
def s_relevance(team_indices, score_dict):
    if not team_indices:
        return 0.0
    return sum(score_dict.get(i, 0.0) for i in team_indices) / len(team_indices)


# Diversity function
# Generate diversity function of single embedding
#solving diversity
def sim(u_emb1, u_emb2):
    # Divide by 16 to scale the number down before sigmoid
    dot_prod = np.dot(u_emb1, u_emb2)
    return sigmoid(dot_prod / 16.0)


# Generate diversity function (diversity of all members on team)
#can be optimized
#can be optimized
def g_diversity(team_members_indices, emb_dev):
    k = len(team_members_indices)# k is the team size

    if k <= 1:
        return 0.0
        #fix div

    total = 0.0
    count = 0

    for i in range(k):
        for j in range(i):
            u1 = emb_dev[team_members_indices[i]]
            u2 = emb_dev[team_members_indices[j]]

            total += sim(u1, u2)
            count += 1

    avg_sim = total / count

    diversity=1.0-avg_sim
    return diversity


# Define the Compatibility Function
def compatability_score( team_members_indices,score_dict, emb_dev, alpha):
    relevance = s_relevance( team_members_indices,score_dict)
    diversity = g_diversity(team_members_indices, emb_dev)

    return alpha * relevance + (1 - alpha) * diversity
#now what we make until now is we compute the score of any team but we not get the best team
#that what will comming soon


# Bounded greedy selection algorithm
def greedy_beam_search(candidate_A, emb_dev, team_size, K, alpha, score_dict, pinned=None):
    pinned_members = list(pinned) if pinned else []

    if len(pinned_members)>team_size:
      #to check that pinned users not more than team size
      raise ValueError (f"Pinned members ({len(pinned)}) exceed team size ({team_size})!")

    remaining= team_size-len(pinned_members)

    #case if pinnes = team size
    if remaining==0:
      return [pinned_members]

    #start with existimg team not empty list
    initial_score= compatability_score(pinned_members, score_dict, emb_dev, alpha) if pinned_members else 0.0
    beam = [(pinned_members, initial_score)]

    #Exclude pinned members from the candidate pool to avoid re-adding them
    new_A = [u for u in candidate_A if u not in set(pinned_members)]


    #fill only the remaining slots
    for step in range(remaining):
        best_by_team = {}  # team_key -> (team_list, score)

        for team, _ in beam:
            for u_idx in candidate_A:
                if u_idx in team:
                    continue

                new_team = team + [u_idx]

                relevance = s_relevance(new_team, score_dict)
                diversity = g_diversity(new_team, emb_dev)
                f_score = alpha * relevance + (1 - alpha) * diversity

                # Canonical key (order-independent)
                team_key = tuple(sorted(new_team))

                # Keep only the best score for the same team set
                if team_key not in best_by_team or f_score > best_by_team[team_key][1]:
                    best_by_team[team_key] = (list(team_key), f_score)

        candidates_for_next_step = list(best_by_team.values())
        candidates_for_next_step.sort(key=lambda x: x[1], reverse=True)
        beam = candidates_for_next_step[:K]

    return [team for team, score in beam]


def resolve_pinned_members(pinned_member_ids, member_id2idx):
    """
    Converts a list of real member IDs submitted by the user
    into internal embedding indices.
    Warns and skips any ID not found (cold-start or invalid users).
    """
    pinned_indices = []
    skipped = []
    for mid in pinned_member_ids:
        if mid in member_id2idx:
            pinned_indices.append(member_id2idx[mid])
        else:
            skipped.append(mid)

    if skipped:
        print(f"⚠️ Skipped {len(skipped)} unrecognized member IDs: {skipped}")

    return pinned_indices


# Prepare Target Project Id
def select_top_diverse_teams(candidate_teams, num_to_select=3):

    if not candidate_teams:
        return []

    # 1. Start with the absolute best team (first in the beam)
    selected_teams = [candidate_teams[0]]
    remaining_teams = candidate_teams[1:]

    while len(selected_teams) < num_to_select and remaining_teams:
        best_next_team = None
        max_min_distance = -1.0

        for candidate in remaining_teams:
            # Calculate distance to already selected teams
            # We want the candidate that is most different from the ones we already have
            distances = []
            set_c = set(candidate)

            for selected in selected_teams:
                set_s = set(selected)
                intersection = len(set_c & set_s)
                union_size = len(set_c) + len(set_s)
                # Hamming distance: 1 - (overlap / total_elements)
                dist = 1 - (intersection / union_size)
                distances.append(dist)

            # Diversity Score: How unique is this team compared to our current selection?
            # We use 'min' to ensure it's different from EVERY selected team (Max-Min)
            min_dist = min(distances)

            if min_dist > max_min_distance:
                max_min_distance = min_dist
                best_next_team = candidate

        if best_next_team:
            selected_teams.append(best_next_team)
            remaining_teams.remove(best_next_team)
        else:
            break

    return selected_teams