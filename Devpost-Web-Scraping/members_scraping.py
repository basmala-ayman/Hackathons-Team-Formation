import requests
import pandas as pd
import time
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Accept-Language": "en-US,en;q=0.9",
}

session = requests.Session()
session.headers.update(HEADERS)

# =====================
# PLAYWRIGHT: COUNT WINS (SIMPLE RETRY)
# =====================
def count_user_wins_playwright(page, challenges_url):
    wins = 0
    page_num = 1

    while True:
        url = f"{challenges_url}?page={page_num}"

        # 🔁 simple retry like your other script
        while True:
            try:
                page.goto(url, timeout=15000)
                break
            except:
                print("⚠️ Playwright navigation failed, retrying...")
                time.sleep(2)
                continue

        try:
            page.wait_for_selector(
                'div.row[data-browse-challenges="challenge-listing"]',
                timeout=8000
            )
        except:
            break

        rows = page.query_selector_all(
            'div.row[data-browse-challenges="challenge-listing"]'
        )

        if not rows:
            break

        for row in rows:
            if row.query_selector("span.participation-badge.winner"):
                wins += 1

        page_num += 1
        time.sleep(0.4)

    return wins

# =====================
# LOAD USERS
# =====================
df = pd.read_csv("Devpost-Datasets/2020_unique_members.csv")

# for testing
df = df.iloc[0:6000]
CHUNK_SIZE = 100
OUTPUT_FILE = "Devpost-Datasets/2020_members.csv"
users_buffer = []

# =====================
# START PLAYWRIGHT ONCE
# =====================
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    for start in range(0, len(df), CHUNK_SIZE):
        chunk = df.iloc[start:start + CHUNK_SIZE]
        print(f"\nProcessing users {start} → {start + len(chunk)}")

        for idx, row in chunk.iterrows():
            profile_url = row["Member URL"]
            username = row["Member Username"]

            print(f"→ Scraping user: {username} ({idx + 1}/{len(df)})")

            # SIMPLE REQUEST RETRY
            rcount = 0
            while True:
                try:
                    r = session.get(profile_url, timeout=20)

                    if r.status_code == 410:
                        print("⏭️ User does not exist, skipping...")
                        r = None
                        break

                    if r.status_code != 200:
                        print(f"⚠️ HTTP {r.status_code}, retrying...")
                        rcount += 1
                        if rcount >= 8:
                            print("⚠️ Max retries reached, skipping user.")
                            r = None
                            break
                        time.sleep(1)
                        continue
                    break
                except Exception as e:
                 rcount += 1
                 print(f"⚠️ request failed ({e}), retrying... ({rcount}/8)")
                if rcount >= 8:
                     print("⚠️ Max retries reached due to exceptions, skipping user.")
                     r = None
                     break
                time.sleep(2)


            if r is None:
                continue
            soup = BeautifulSoup(r.text, "lxml")

            # BASIC INFO
            name_tag = soup.select_one("#portfolio-user-name")
            name = name_tag.text.split("(")[0].strip() if name_tag else ""

            bio_tag = soup.select_one("#portfolio-user-bio i")
            bio = bio_tag.text.strip() if bio_tag else ""

            location = ""
            loc = soup.select_one("li span.ss-location")
            if loc:
                location = loc.find_parent("li").text.strip()

            def get_link(icon_class):
                icon = soup.select_one(f"li span.{icon_class}")
                if icon:
                    a = icon.find_parent("li").find("a")
                    return a["href"] if a else ""
                return ""

            website = get_link("ss-link")
            github = get_link("ss-octocat")
            # SKILLS
            hard_skills = [
                s.text.strip()
                for s in soup.select(
                    "#portfolio-user-info div div div:nth-of-type(1) ul li span"
                )
            ]

            soft_skills = [
                s.text.strip()
                for s in soup.select(
                    "#portfolio-user-info div div div:nth-of-type(2) ul li span"
                )
            ]

            # COUNTS
            counts = [
                c.text.strip()
                for c in soup.select(
                    "#portfolio-navigation ul li a div span"
                )
            ]

            projects, hackathons, achievements, followers, following, likes = (
                counts + ["0"] * 6
            )[:6]

            hackathon_num = int(hackathons.replace("+", "")) if hackathons else 0

            # WINNINGS (PLAYWRIGHT, SIMPLE RETRY)
            winnings = 0
            if hackathon_num > 0:
                challenges_url = profile_url.rstrip("/") + "/challenges"
                winnings = count_user_wins_playwright(page, challenges_url)

            users_buffer.append({
                "Username": username,
                "Name": name,
                "Bio": bio,
                "Location": location,
                "Website": website,
                "GitHub": github,
                "Hard Skills": hard_skills,
                "Soft Skills": soft_skills,
                "Projects Count": projects,
                "Hackathons Count": hackathons,
                "Achievements Count": achievements,
                "Followers Count": followers,
                "Following Count": following,
                "Like Count": likes,
                "Winnings Count": winnings,
            })

            time.sleep(0.6)

        pd.DataFrame(users_buffer).to_csv(
            OUTPUT_FILE,
            mode="a",
            header=(start == 0),
            index=False,
            encoding="utf-8-sig"
        )

        users_buffer.clear()

    browser.close()

print("\n✅ Hybrid scraping completed safely.")