import torch
import torch.nn as nn

# One-Hop Model for cold start
class AdditiveAttention(nn.Module):
    def __init__(self, dim: int):
        super().__init__()
        self.b = nn.Linear(dim, dim, bias=True)     # b_w x + c_w
        self.a = nn.Parameter(torch.empty(dim))     # a_w
        nn.init.xavier_uniform_(self.b.weight)
        nn.init.zeros_(self.b.bias)
        nn.init.normal_(self.a, std=0.02)

    def forward(self, X: torch.Tensor, mask: torch.Tensor) -> torch.Tensor:
        mask = mask.bool()
        B, L, D = X.shape

        H = torch.tanh(self.b(X))                  # [B,L,D]
        scores = torch.matmul(H, self.a)           # [B,L]

        valid_row = mask.any(dim=1)                # [B]
        out = torch.zeros((B, D), device=X.device, dtype=X.dtype)
        if valid_row.any():
            scores_v = scores[valid_row]
            mask_v   = mask[valid_row]
            neg_inf = torch.finfo(scores_v.dtype).min
            scores_v = scores_v.masked_fill(~mask_v, neg_inf)
            alpha = torch.softmax(scores_v, dim=1)
            out[valid_row] = torch.bmm(alpha.unsqueeze(1), X[valid_row]).squeeze(1)
        return out


def ensure_nonempty_sequence(ids_b, mask_b, unk_id=1):
    empty = ~mask_b.any(dim=1)
    if empty.any():
        ids_b = ids_b.clone()
        mask_b = mask_b.clone()
        ids_b[empty, 0] = unk_id
        mask_b[empty, 0] = True
    return ids_b, mask_b


def expand_embedding_layer(embedding_layer: nn.Embedding, new_num_embeddings: int):
    old_num_embeddings, embedding_dim = embedding_layer.weight.shape
    if new_num_embeddings <= old_num_embeddings:
        return embedding_layer
    
    new_layer = nn.Embedding(new_num_embeddings, embedding_dim, padding_idx=embedding_layer.padding_idx)
    nn.init.xavier_uniform_(new_layer.weight)
    with torch.no_grad():
        new_layer.weight[:old_num_embeddings].copy_(embedding_layer.weight)
        if embedding_layer.padding_idx is not None:
            new_layer.weight[embedding_layer.padding_idx] = 0.0
            
    return new_layer


class MultiHeadSelfAttention(nn.Module):
    def __init__(self, d: int, n_heads: int):
        super().__init__()
        self.d = d
        self.n_heads = n_heads
        self.w1 = nn.Parameter(torch.empty(n_heads, d, d))
        self.w2 = nn.Parameter(torch.empty(n_heads, d, d))
        nn.init.xavier_uniform_(self.w1)
        nn.init.xavier_uniform_(self.w2)

    def forward(self, E: torch.Tensor, mask: torch.Tensor) -> torch.Tensor:
        mask = mask.bool()
        B, L, D = E.shape
        neg_inf = torch.finfo(E.dtype).min

        head_outs = []
        for k in range(self.n_heads):
            W1 = self.w1[k]  # [D,D]
            W2 = self.w2[k]  # [D,D]

            EW1 = torch.matmul(E, W1)                         # [B,L,D]
            scores = torch.matmul(EW1, E.transpose(1, 2))      # [B,L,L]

            key_mask = mask.unsqueeze(1).expand(B, L, L)       # mask keys j
            scores = scores.masked_fill(~key_mask, neg_inf)

            A = torch.softmax(scores, dim=2)                   # over j
            ctx = torch.matmul(A, E)                           # [B,L,D]
            h_k = torch.matmul(ctx, W2.transpose(0, 1))         # [B,L,D]
            head_outs.append(h_k)

        H = torch.cat(head_outs, dim=2)                         # [B,L,n_heads*D]
        H = H.masked_fill(~mask.unsqueeze(-1), 0.0)              # zero padded queries i
        return H


class Encoder(nn.Module):
    """
    Variant: task title uses Eq(5)+Eq(6), dev text ALSO uses Eq(5)+Eq(6),
    labels use Eq(6).
    """
    def __init__(self, word_vocab_size: int, label_vocab_size: int,
                 d_word: int = 128, d_label: int = 128, n_heads: int = 4, dropout: float = 0.1):
        super().__init__()
        self.word_emb  = nn.Embedding(word_vocab_size, d_word, padding_idx=0)
        self.label_emb = nn.Embedding(label_vocab_size, d_label, padding_idx=0)
        self.dropout = nn.Dropout(dropout)

        self.eq5_words = MultiHeadSelfAttention(d=d_word, n_heads=n_heads)

        self.word_pool  = AdditiveAttention(dim=n_heads * d_word)  # pools Eq(5) outputs
        self.label_pool = AdditiveAttention(dim=d_label)

        self.n_heads = n_heads
        self.d_word = d_word
        self.d_label = d_label

    def encode_project(self, title_ids, title_mask, tag_ids, tag_mask):
        title_ids, title_mask = ensure_nonempty_sequence(title_ids, title_mask, unk_id=1)

        E = self.dropout(self.word_emb(title_ids))          # [B,L,Dw]
        H = self.eq5_words(E, title_mask)                   # [B,L,nH*Dw]
        vtitle = self.word_pool(H, title_mask)              # [B,nH*Dw]

        Lemb = self.dropout(self.label_emb(tag_ids))        # [B,Lt,Dl]
        vlabel = self.label_pool(Lemb, tag_mask)            # [B,Dl]

        return torch.cat([vtitle, vlabel], dim=1)           # [B, nH*Dw + Dl]

    def encode_member(self, text_ids, text_mask, devlbl_ids, devlbl_mask):
        text_ids, text_mask = ensure_nonempty_sequence(text_ids, text_mask, unk_id=1)

        E = self.dropout(self.word_emb(text_ids))           # [B,L,Dw]
        H = self.eq5_words(E, text_mask)                    # [B,L,nH*Dw]
        utext = self.word_pool(H, text_mask)                # [B,nH*Dw]

        Lemb = self.dropout(self.label_emb(devlbl_ids))     # [B,Ll,Dl]
        ulabel = self.label_pool(Lemb, devlbl_mask)         # [B,Dl]

        return torch.cat([utext, ulabel], dim=1)            # [B, nH*Dw + Dl]


class OneHopModule(nn.Module):
    def __init__(self, word_vocab_size, label_vocab_size,
                 num_devs, num_tasks,
                 d_word=128, d_label=128, n_heads=4,
                 d_id=64, common_dim=256, dropout=0.1):
        super().__init__()
        self.d_id = d_id

        self.text = Encoder(
            word_vocab_size, label_vocab_size,
            d_word=d_word, d_label=d_label, n_heads=n_heads, dropout=dropout
        )

        self.dev_id  = nn.Embedding(num_devs,  d_id)
        self.task_id = nn.Embedding(num_tasks, d_id)

        task_sem_dim = (n_heads * d_word) + d_label
        dev_sem_dim  = (n_heads * d_word) + d_label  # text + labels

        self.dev_proj  = nn.Linear(d_id + dev_sem_dim,  common_dim)
        self.task_proj = nn.Linear(d_id + task_sem_dim, common_dim)

    def score(self, dev_idx, task_idx,
              # developer text + merged labels
              text_ids, text_mask, devlbl_ids, devlbl_mask,
              # task title+tags
              title_ids, title_mask, tag_ids, tag_mask,
              dev_known_mask=None, task_known_mask=None):

        # semantic embeddings
        u_t = self.text.encode_member(text_ids, text_mask, devlbl_ids, devlbl_mask)
        v_t = self.text.encode_project(title_ids, title_mask, tag_ids, tag_mask)

        # ----- ID gating (cold-start) -----
        if dev_known_mask is None:
            u_id = self.dev_id(dev_idx)
        else:
            u_id = torch.zeros(
                (dev_idx.size(0), self.d_id),
                device=dev_idx.device,
                dtype=self.dev_id.weight.dtype
            )
            if dev_known_mask.any():
                u_id[dev_known_mask] = self.dev_id(dev_idx[dev_known_mask])

        if task_known_mask is None:
            v_id = self.task_id(task_idx)
        else:
            v_id = torch.zeros(
                (task_idx.size(0), self.d_id),
                device=task_idx.device,
                dtype=self.task_id.weight.dtype
            )
            if task_known_mask.any():
                v_id[task_known_mask] = self.task_id(task_idx[task_known_mask])

        # ----- project to common space + dot product -----
        z_u = self.dev_proj(torch.cat([u_id, u_t], dim=1))
        z_v = self.task_proj(torch.cat([v_id, v_t], dim=1))
        return (z_u * z_v).sum(dim=1)


# Two-Hop Model
class QueryAdditiveAttention(nn.Module):
    """
    Query-based additive attention:
      query: [B, D]
      keys/values X: [B, L, D]
      mask: [B, L] (True = valid)
    returns:
      ctx: [B, D]
    """
    def __init__(self, d_model: int, hidden: int = 128, dropout: float = 0.0):
        super().__init__()
        self.Wq = nn.Linear(d_model, hidden, bias=True)
        self.Wk = nn.Linear(d_model, hidden, bias=True)
        self.v  = nn.Linear(hidden, 1, bias=False)
        self.drop = nn.Dropout(dropout)

    def forward(self, query: torch.Tensor, X: torch.Tensor, mask: torch.Tensor) -> torch.Tensor:
        # query: [B,D], X: [B,L,D], mask: [B,L]
        mask = mask.bool()
        B, L, D = X.shape

        # if a row has no neighbors, return zeros
        valid_row = mask.any(dim=1)  # [B]
        out = torch.zeros((B, D), device=X.device, dtype=X.dtype)
        if not valid_row.any():
            return out

        q = query[valid_row]                 # [Bv,D]
        Xv = X[valid_row]                    # [Bv,L,D]
        mv = mask[valid_row]                 # [Bv,L]

        # additive attention score
        # score_{i,j} = v^T tanh(Wq q_i + Wk x_{i,j})
        qh = self.Wq(q).unsqueeze(1)         # [Bv,1,H]
        kh = self.Wk(Xv)                     # [Bv,L,H]
        e  = self.v(torch.tanh(qh + kh)).squeeze(-1)  # [Bv,L]
        e = self.drop(e)

        neg_inf = torch.finfo(e.dtype).min
        e = e.masked_fill(~mv, neg_inf)
        a = torch.softmax(e, dim=1)          # [Bv,L]

        ctx = torch.bmm(a.unsqueeze(1), Xv).squeeze(1)  # [Bv,D]
        out[valid_row] = ctx
        return out


class TwoHopModule(nn.Module):
    """
    Two-hop stage:
      base embeddings are frozen (from your improved one-hop that supports warm+cold in full space).
      trainable parts:
        - attention aggregators for 1-hop and 2-hop
        - fusion layers
    """
    def __init__(self, onehop_user_embs, onehop_proj_embs, common_dim=256, attn_hidden=128, dropout=0.1):
        super().__init__()

        # Base frozen embeddings (MUST be full-space aligned indices)
        self.base_user_lookup = nn.Embedding.from_pretrained(
            torch.from_numpy(onehop_user_embs).float(),
            freeze=True
        )
        self.base_proj_lookup = nn.Embedding.from_pretrained(
            torch.from_numpy(onehop_proj_embs).float(),
            freeze=True
        )

        self.common_dim = common_dim

        # Trainable query-attention aggregators
        self.user_attn_1 = QueryAdditiveAttention(common_dim, attn_hidden, dropout=dropout)  # U -> V -> ctx1 (projects)
        self.user_attn_2 = QueryAdditiveAttention(common_dim, attn_hidden, dropout=dropout)  # U -> U2 -> ctx2 (users)

        self.proj_attn_1 = QueryAdditiveAttention(common_dim, attn_hidden, dropout=dropout)  # V -> U -> ctx1 (users)
        self.proj_attn_2 = QueryAdditiveAttention(common_dim, attn_hidden, dropout=dropout)  # V -> V2 -> ctx2 (projects)

        # Fusion
        self.user_fuse = nn.Linear(common_dim * 3, common_dim)
        self.proj_fuse = nn.Linear(common_dim * 3, common_dim)

    def embed_users_base(self, u_idx: torch.Tensor) -> torch.Tensor:
        return self.base_user_lookup(u_idx)

    def embed_projects_base(self, v_idx: torch.Tensor) -> torch.Tensor:
        return self.base_proj_lookup(v_idx)

    def fuse(self, u_base, v_base, u_ctx1, u_ctx2, v_ctx1, v_ctx2):
        u_final = torch.tanh(self.user_fuse(torch.cat([u_base, u_ctx1, u_ctx2], dim=1)))
        v_final = torch.tanh(self.proj_fuse(torch.cat([v_base, v_ctx1, v_ctx2], dim=1)))
        return u_final, v_final

    def score_vectors(self, u_vec, v_vec):
        return (u_vec * v_vec).sum(dim=1)

    def forward(self,
                u_idx, v_idx,
                # neighbor matrices (already padded)
                u1_mat, u1_mask,   # u -> 1-hop projects indices
                u2_mat, u2_mask,   # u -> 2-hop users indices
                v1_mat, v1_mask,   # v -> 1-hop users indices
                v2_mat, v2_mask):  # v -> 2-hop projects indices

        # base
        u_base = self.embed_users_base(u_idx)     # [B,D]
        v_base = self.embed_projects_base(v_idx)  # [B,D]

        # neighbor embeddings
        # user side:
        u1_emb = self.base_proj_lookup(u1_mat)    # [B,L1,D] (projects)
        u2_emb = self.base_user_lookup(u2_mat)    # [B,L2,D] (users)

        # project side:
        v1_emb = self.base_user_lookup(v1_mat)    # [B,L1,D] (users)
        v2_emb = self.base_proj_lookup(v2_mat)    # [B,L2,D] (projects)

        # query-attn aggregation
        u_ctx1 = self.user_attn_1(u_base, u1_emb, u1_mask)  # [B,D]
        u_ctx2 = self.user_attn_2(u_base, u2_emb, u2_mask)  # [B,D]

        v_ctx1 = self.proj_attn_1(v_base, v1_emb, v1_mask)  # [B,D]
        v_ctx2 = self.proj_attn_2(v_base, v2_emb, v2_mask)  # [B,D]

        # fuse + score
        u_final, v_final = self.fuse(u_base, v_base, u_ctx1, u_ctx2, v_ctx1, v_ctx2)
        return self.score_vectors(u_final, v_final)