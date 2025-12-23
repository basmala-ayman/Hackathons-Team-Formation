import requests
import pandas as pd
import time
import re
from bs4 import BeautifulSoup

df = pd.read_csv("Devpost-Datasets/all-hackathons.csv").dropna(subset=["Projects Gallery"])

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Accept-Language": "en-US,en;q=0.9",
}

all_projects = []

for i, row in df.iterrows():
    gallery_url = row["Projects Gallery"]
    page = 1

    while True:
        url = f"{gallery_url}?page={page}"
        r = requests.get(url, headers=HEADERS, timeout=20)

        if r.status_code != 200:
            break

        soup = BeautifulSoup(r.text, "html.parser")
        projects = soup.select(".gallery-item")

        if not projects:
            break

        for p in projects:
            title = p.select_one("h5")
            title = title.text.strip() if title else ""

            link = p.select_one("a")
            link = link["href"] if link else ""

            desc = p.select_one(".tagline")
            desc = desc.text.strip() if desc else ""

            members = p.select_one(".members")
            participants = 0

            if members:
                imgs = members.select("img.user-photo")
                participants = len(imgs)

                matches = re.findall(r"\+\s*(\d+)", members.text)
                participants += sum(map(int, matches))

            likes = p.select_one(".like-count")
            comments = p.select_one(".comment-count")

            all_projects.append({
                "Hackathon ID": row["id"],
                "Hackathon Slug": row["Hackathon Slug"],
                "Project Title": title,
                "Project Description": desc,
                "Project Link": link,
                "Participants Count": participants,
                "Likes": likes.text if likes else "0",
                "Comments": comments.text if comments else "0",
            })

        page += 1
        time.sleep(0.5)

    print(f"✔ Finished hackathon {row['id']}")

projects_df = pd.DataFrame(all_projects)
projects_df.to_csv("Devpost-Datasets/hackathon_projects.csv", index=False, encoding="utf-8-sig")
