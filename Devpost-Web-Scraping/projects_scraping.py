from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

df = pd.read_csv("Devpost-Hackathons-API/all-hackathons.csv")

# Filter: more than 100 participants and years 2024 or 2025
df = df[
    (df["Registrations Count"] > 100) &
    (df["Submission Period"].str.contains("2024|2025", na=False))
]

# limit the hachathons number to 5 only
df = df.head(2)

print(f"Selected {len(df)} hackathons after filtering.")

# Open browser
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

all_projects = []

for i, row in df.iterrows():
  
    gallery_url = row["Projects Gallery"]
    if pd.isna(gallery_url):
        continue

    print(f"Scraping hackathon {i+1}/{len(df)}: {gallery_url}")
    driver.get(gallery_url)
    time.sleep(5)

    projects = driver.find_elements(By.CLASS_NAME, "gallery-item")
    print(f"  Found {len(projects)} projects.")

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

        # Participants Count
        try:
            members = p.find_elements(By.CSS_SELECTOR, ".members ")
            participants = len(members)
        except:
            participants = 0

        # Likes
        try:
            likes = p.find_element(By.CSS_SELECTOR, ".like-count").text
        except:
            likes = "0"

        # Comments
        try:
            comments = p.find_element(By.CSS_SELECTOR, ".comment-count").text
        except:
            comments = "0"

        all_projects.append({
            "Hackathon": row["Title"],
            "Hackathon Slug": row["Hackathon Slug"],
            "Project Title": title,
            "Project Description": desc,
            "Project Link": link,
            "Participants Count": participants,
            "Likes": likes,
            "Comments": comments,
            "Gallery URL": gallery_url
        })

    time.sleep(3)

projects_df = pd.DataFrame(all_projects)
projects_df.to_csv("hackathon-projects.csv", index=False, encoding="utf-8-sig")

driver.quit()
print("Scraping done, saved to filtered-hackathon-projects.csv")
