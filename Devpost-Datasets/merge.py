# import pandas as pd

# files = [
#     "Devpost-Datasets/Teams/teams (10000-14000) .csv",
#     "Devpost-Datasets/Teams/teams 3 (20000-30000).csv",
#     "Devpost-Datasets/Teams/teams from 30000 to 40000 .csv",
#     "Devpost-Datasets/Teams/teams.csv",
# ]

# dfs = [pd.read_csv(f) for f in files]
# merged = pd.concat(dfs, ignore_index=True)

# merged.to_csv("teams.csv", index=False, encoding="utf-8-sig")
# print("✅ merged into Devpost-Datasets/teams.csv")


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
