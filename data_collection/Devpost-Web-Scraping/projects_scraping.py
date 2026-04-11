import requests
import pandas as pd
import time
import re
import os
from bs4 import BeautifulSoup

df = pd.read_csv("Devpost-Datasets/all-hackathons.csv").dropna(subset=["Projects Gallery"])

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Accept-Language": "en-US,en;q=0.9",
}

OUTPUT_FILE = "Devpost-Datasets/hackathon_projects.csv"

session = requests.Session()
session.headers.update(HEADERS)

file_exists = os.path.exists(OUTPUT_FILE)

for i, row in df.iterrows():
    gallery_url = row["Projects Gallery"]
    page = 1
    rows_buffer = []

    while True:
        url = f"{gallery_url}?page={page}"

        try:
            r = session.get(url, timeout=20)
            if r.status_code != 200:
                break
        except requests.RequestException:
            print("⚠️ request failed, retrying...")
            time.sleep(2)
            continue

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

            rows_buffer.append({
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

    # WRITE AFTER EACH HACKATHON (CRASH SAFE)
    if rows_buffer:
        pd.DataFrame(rows_buffer).to_csv(
            OUTPUT_FILE,
            mode="a",
            header=not file_exists,
            index=False,
            encoding="utf-8-sig"
        )
        file_exists = True

    print(f"✔ Finished hackathon {row['id']} ({i+1}/{len(df)})")

print("✅ All hackathon projects scraped safely.")
