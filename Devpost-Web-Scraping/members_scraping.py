from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd

members_url = pd.read_csv('Devpost-Datasets/team_members.csv')
usernames = members_url["Member Username"]
members_url = members_url["Member URL"].drop_duplicates().head(3).tolist()

members_table = []

# Open browser
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 3)

for i in range(len(members_url)):
    if(members_url[i] == "private user" or members_url[i] == ""):
        print(f"Skipping private or invalid user at index {i}")
        continue
    
    driver.get(members_url[i])

    # Wait for the profile header to load
    try:
        wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="container"]')))
    except:
        print(f"Failed to load profile: {members_url[i]}")
        continue

    username = usernames.iloc[i]

    name = driver.find_element(By.XPATH, '//*[@id="portfolio-user-name"]').text.split("(")[0].strip()
    hard_skills = []
    soft_skills = []

    # bio if exists
    try:
        bio = driver.find_element(By.XPATH, '//*[@id="portfolio-user-bio"]/i').text.strip()
    except:
        bio = ''

    # location if exists
    try:
        location = driver.find_element(By.XPATH, '//*[@id="portfolio-user-links"]/li[span[@class="ss-icon ss-location"]]').text.strip()
    except:
        location = ''
    
    # website if exists
    try:
        website = driver.find_element(By.XPATH, '//*[@id="portfolio-user-links"]/li[span[@class="ss-icon ss-link"]]/a').get_attribute("href")
    except:
        website = ''

    # github if exists
    try:
        github = driver.find_element(By.XPATH, '//*[@id="portfolio-user-links"]/li[span[@class="ss-icon ss-social ss-octocat"]]/a').get_attribute("href")
    except:
        github = ''

    # hard_skills if exists
    try:
        hard_skills_container = driver.find_elements(By.XPATH, '//*[@id="portfolio-user-info"]/div/div/div[1]/ul/li/span')
        for skill in hard_skills_container:
            hard_skills.append(skill.text.strip())
    except:
        hard_skills = []
    
    # Interests if exists
    try:
        interests_container = driver.find_elements(By.XPATH, '//*[@id="portfolio-user-info"]/div/div/div[2]/ul/li/span')
        for interest in interests_container:
            soft_skills.append(interest.text.strip())
    except:
        soft_skills = []
    
    # counters of Projects, Hackathons, Achievements, Followers, Following, Like
    counts_container = driver.find_elements(By.XPATH, '//*[@id="portfolio-navigation"]/ul/li/a/div/span')
    projects_count = counts_container[0].text.strip()
    hackathons_count = counts_container[1].text.strip()
    achievements_count = counts_container[2].text.strip()
    followers_count = counts_container[3].text.strip()
    following_count = counts_container[4].text.strip()
    like_count = counts_container[5].text.strip()
    
    # get hackathons page link to get #winnings
    try:
        hackathons_page = driver.find_element(By.XPATH, '//*[@id="portfolio-navigation"]/ul/li[2]/a').get_attribute("href")
    except:
        hackathons_page = ""

    winnings_count = 0
    page_number = 1

    while True:
        hack_page = f"{hackathons_page}?page={page_number}"
        driver.get(hack_page)

        try:
            hacks = wait.until(
                EC.presence_of_all_elements_located((By.XPATH, '//div[@data-browse-challenges="challenge-listing"]'))
            )
        except:
            # No more pages
            break
        
        winners = driver.find_elements(By.XPATH,"//span[contains(@class, 'winner')]")
        winnings_count += len(winners)
        page_number += 1
    
    
    members_table.append({
        "Username": username,
        "Name": name,
        "Bio": bio,
        "Location": location,
        "Website": website,
        "GitHub": github,
        "Hard Skills": hard_skills,
        "Soft Skills": soft_skills,
        "Projects Count": projects_count,
        "Hackathons Count": hackathons_count,
        "Achievements Count": achievements_count,
        "Followers Count": followers_count,
        "Following Count": following_count,
        "Like Count": like_count,
        "Hackathons Page URL": hackathons_page,
        "Winnings Count": winnings_count
    })

    # just for checking / tracking
    print(f"{username} is Completed!!")

members_df = pd.DataFrame(members_table)
members_df.to_csv('Devpost-Datasets/members.csv', index=False, encoding="utf-8-sig")

driver.quit()
print("Scraping Completed!")