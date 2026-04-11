import pandas as pd
import glob
import os

folder = "Devpost-Datasets/Team_Members"
files = sorted(glob.glob(os.path.join(folder, "*.csv")))

dfs = [pd.read_csv(f) for f in files]
merged = pd.concat(dfs, ignore_index=True)

out = "Devpost-Datasets/team_members.csv"
merged.to_csv(out, index=False, encoding="utf-8-sig")
print(f"✅ merged {len(files)} files into {out}")