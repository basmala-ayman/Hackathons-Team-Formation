import requests
import pandas as pd
import time
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Accept-Language": "en-US,en;q=0.9",
}

df = pd.read_csv("Devpost-Datasets/hackathon_projects.csv")
df = df.dropna(subset=["Project Link"])
df = df.iloc[0:5]
CHUNK_SIZE = 300

teams = []
team_members = []

for start in range(0, len(df), CHUNK_SIZE):
    chunk = df.iloc[start:start + CHUNK_SIZE]
    print(f"Processing projects {start} → {start + len(chunk)}")

    for _, row in chunk.iterrows():
        url = row["Project Link"]
        hackathon_id = row["Hackathon ID"]
        project_slug = url.rstrip("/").split("/")[-1]

        try:
            r = requests.get(url, headers=HEADERS, timeout=20)
            if r.status_code != 200:
                continue
        except:
            continue

        soup = BeautifulSoup(r.text, "lxml")

        # =====================
        # Team members
        # =====================
        members = soup.select("#app-team ul li")
        member_count = 0

        for m in members:
            member_count += 1
            a = m.select_one("a[href]")
            username = "private user"
            member_url = "private user"

            if a:
                member_url = a["href"]
                username = member_url.split("/")[-1]

            bubble = m.select_one(".bubble")
            desc = bubble.text.strip() if bubble else ""

            team_members.append({
                "Project Slug": project_slug,
                "Member Username": username,
                "Member URL": member_url,
                "Member Description": desc
            })

        # =====================
        # Winners
        # =====================
        winner_nodes = soup.select("#submissions ul li div ul li")
        is_winner = bool(winner_nodes)
        winner_desc = [w.text.partition(" ")[2] for w in winner_nodes]

        # =====================
        # Tags
        # =====================
        tags = [t.text.strip() for t in soup.select("#built-with ul li")]

        # =====================
        # Description
        # =====================
        desc_div = soup.select_one("#app-details-left div:nth-of-type(2)")
        project_desc = desc_div.text.strip() if desc_div else ""

        teams.append({
            "Hackathon ID": hackathon_id,
            "Project Slug": project_slug,
            "Members Count": member_count,
            "Is Winner": is_winner,
            "Winners Description": ", ".join(winner_desc),
            "Project Tags": tags,
            "Project Description": project_desc
        })

        time.sleep(0.7)  # SAFE rate

    # =====================
    # SAVE INCREMENTALLY
    # =====================
    pd.DataFrame(team_members).to_csv(
        "Devpost-Datasets/team_members.csv",
        mode="a",
        header=(start == 0),
        index=False,
        encoding="utf-8-sig"
    )

    pd.DataFrame(teams).to_csv(
        "Devpost-Datasets/teams.csv",
        mode="a",
        header=(start == 0),
        index=False,
        encoding="utf-8-sig"
    )

    team_members.clear()
    teams.clear()

print("✅ Project details scraping completed safely.")