from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

members_url = pd.read_csv('Devpost-Datasets/team_members.csv')
usernames = members_url["Member Username"]
members_url = members_url["Member URL"]
members_url = members_url.head(15)

members_table = []

# Open browser
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

for i in range(len(members_url)):
    driver.get(members_url.iloc[i])
    time.sleep(2)

    username = usernames.iloc[i]

    name = driver.find_element(By.XPATH, '//*[@id="portfolio-user-name"]').text.split("(")[0].strip()
    hard_skills = []
    soft_skills = []

    # location if found
    try:
        location = driver.find_element(By.XPATH, '//*[@id="portfolio-user-links"]/li[span[@class="ss-icon ss-location"]]').text.strip()
    except:
        location = ''
    
    # website if found
    try:
        website = driver.find_element(By.XPATH, '//*[@id="portfolio-user-links"]/li[span[@class="ss-icon ss-link"]]/a').get_attribute("href")
    except:
        website = ''

    # github if found
    try:
        github = driver.find_element(By.XPATH, '//*[@id="portfolio-user-links"]/li[span[@class="ss-icon ss-social ss-octocat"]]/a').get_attribute("href")
    except:
        github = ''

    # hard_skills if found
    try:
        hard_skills_container = driver.find_elements(By.XPATH, '//*[@id="portfolio-user-info"]/div/div/div[1]/ul/li/span')
        for skill in hard_skills_container:
            hard_skills.append(skill.text.strip())
    except:
        hard_skills = []
    
    # Interests if found
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
    hackathons_page = driver.find_element(By.XPATH, '//*[@id="portfolio-navigation"]/ul/li[2]/a').get_attribute("href")
    driver.get(hackathons_page)
    time.sleep(1)

    # number of hackathon winnings
    try:
        winnings_count = len(driver.find_elements(By.XPATH, '//*[@id="container"]/section/div[2]/div/section/div[1]/div/article/a/div[1]/section/div/span'))
    except:
        winnings_count = 0

    members_table.append({
        "Username": username,
        "Name": name,
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