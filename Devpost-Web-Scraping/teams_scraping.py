import requests
import pandas as pd
import time
import os
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Accept-Language": "en-US,en;q=0.9",
}

df = pd.read_csv("Devpost-Datasets/hackathon_projects.csv")
df = df.dropna(subset=["Project Link"])

# for testing
df = df.iloc[0:5]

CHUNK_SIZE = 300

TEAM_MEMBERS_FILE = "Devpost-Datasets/team_members.csv"
TEAMS_FILE = "Devpost-Datasets/teams.csv"

session = requests.Session()
session.headers.update(HEADERS)

team_members_buffer = []
teams_buffer = []

team_members_exists = os.path.exists(TEAM_MEMBERS_FILE)
teams_exists = os.path.exists(TEAMS_FILE)

for start in range(0, len(df), CHUNK_SIZE):
    chunk = df.iloc[start:start + CHUNK_SIZE]
    print(f"Processing projects {start} → {start + len(chunk)}")

    for idx, row in chunk.iterrows():
        url = row["Project Link"]
        hackathon_id = row["Hackathon ID"]
        project_slug = url.rstrip("/").split("/")[-1]

        # ---------- Request with retry ----------
        try:
            r = session.get(url, timeout=20)
            if r.status_code != 200:
                continue
        except requests.RequestException:
            time.sleep(2)
            continue

        soup = BeautifulSoup(r.text, "lxml")

        # Team members
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

            team_members_buffer.append({
                "Project Slug": project_slug,
                "Member Username": username,
                "Member URL": member_url,
                "Member Description": desc
            })

        # Winners
        winner_nodes = soup.select("#submissions ul li div ul li")
        is_winner = bool(winner_nodes)
        winner_desc = [w.text.partition(" ")[2] for w in winner_nodes]

        # Tags
        tags = [t.text.strip() for t in soup.select("#built-with ul li")]

        # Description
        desc_div = soup.select_one("#app-details-left div:nth-of-type(2)")
        project_desc = desc_div.text.strip() if desc_div else ""

        teams_buffer.append({
            "Hackathon ID": hackathon_id,
            "Project Slug": project_slug,
            "Members Count": member_count,
            "Is Winner": is_winner,
            "Winners Description": ", ".join(winner_desc),
            "Project Tags": tags,
            "Project Description": project_desc
        })
        print(f"✔ Finished project: {project_slug} ({idx + 1}/{len(df)})")
        # print(f"✔ Finished project: {project_slug} ({start + _ + 1}/{len(df)})")
        time.sleep(0.7)

    # SAVE CHUNK SAFELY
    if team_members_buffer:
        pd.DataFrame(team_members_buffer).to_csv(
            TEAM_MEMBERS_FILE,
            mode="a",
            header=not team_members_exists,
            index=False,
            encoding="utf-8-sig"
        )
        team_members_exists = True

    if teams_buffer:
        pd.DataFrame(teams_buffer).to_csv(
            TEAMS_FILE,
            mode="a",
            header=not teams_exists,
            index=False,
            encoding="utf-8-sig"
        )
        teams_exists = True

    team_members_buffer.clear()
    teams_buffer.clear()

print("✅ Project details scraping completed safely.")