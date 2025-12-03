from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
# import time
import re

df = pd.read_csv("Devpost-Datasets/all-hackathons.csv")

# # Filter: more than 100 participants and years 2024 or 2025
# df = df[
#     (df["Registrations Count"] > 100) &
#     (df["Submission Period"].str.contains("2024|2025", na=False))
# ]

# # Limit hackathons number to 10 (for testing)
# df = df.head(10)

# print(f"Selected {len(df)} hackathons after filtering.")

# run for each 100 hackathons
df = df.iloc[0:5]

# Open browser to be controlled by the code
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 3)

all_projects = []

for i, row in df.iterrows():
    gallery_url = row["Projects Gallery"]
    if pd.isna(gallery_url):
        continue

    print(f"Scraping hackathon {i+1}/{len(df)}: {gallery_url}")

    page_number = 1
    while True:
        paged_url = f"{gallery_url}?page={page_number}"
        driver.get(paged_url)

        # wait for page to load
        # time.sleep(2)

        # projects = driver.find_elements(By.CLASS_NAME, "gallery-item")
        # if not projects:
            # break

         # Wait until project cards exist OR break if not found
        try:
            projects = wait.until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "gallery-item"))
            )
        except:
            # No more pages
            break

        print(f"  Page {page_number}: Found {len(projects)} projects.")

        for p in projects:
            # Title
            try:
                title = p.find_element(By.TAG_NAME, "h5").text
            except:
                title = ""

            # Link
            try:
                link = p.find_element(By.TAG_NAME, "a").get_attribute("href")
            except:
                link = ""

            # Description
            try:
                desc = p.find_element(By.CLASS_NAME, "tagline").text
            except:
                desc = ""

            # Participants Count (including overflow ones)
            try:
                members_div = p.find_element(By.CLASS_NAME, "members")

                # Count visible member images
                members = members_div.find_elements(
                    By.CSS_SELECTOR, "img.user-photo")
                participants = sum(
                    1 for m in members if m.get_attribute("src"))

                # Add any '+N' numbers inside the div text
                div_text = members_div.text

                # Search by regular expression (regex) library for any number after +
                matches = re.findall(r"\+\s*(\d+)", div_text)
                if matches:
                    participants += sum(int(m) for m in matches)

            except:
                participants = 0

            # Likes
            try:
                likes = p.find_element(By.CSS_SELECTOR, ".like-count").text
            except:
                likes = "0"

            # Comments
            try:
                comments = p.find_element(
                    By.CSS_SELECTOR, ".comment-count").text
            except:
                comments = "0"

            all_projects.append({
                # Added Hackathon ID Column
                "Hackathon ID": row["id"],
                "Hackathon Slug": row["Hackathon Slug"],
                "Project Title": title,
                "Project Description": desc,
                "Project Link": link,
                "Participants Count": participants,
                "Likes": likes,
                "Comments": comments,
            })

        page_number += 1

projects_df = pd.DataFrame(all_projects)
projects_df.to_csv("Devpost-Datasets/hackathon-projects.csv", mode="w", index=False, encoding="utf-8-sig")

driver.quit()
print("Scraping done, saved to hackathon-projects.csv")
