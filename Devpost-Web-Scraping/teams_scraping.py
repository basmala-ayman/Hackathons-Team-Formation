from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

df = pd.read_csv("Devpost-Web-Scraping/hackathon-projects.csv")
df = df["Project Link"]
df = df.head(15)

# Open browser
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

teams = []
team_members = []

for i in range(len(df)):
    driver.get(df.iloc[i])
    time.sleep(2)
    project_slug = df[i].split("/")[-1]
    
    members_container = driver.find_elements(By.XPATH, '//li/div/div/figure/a[@class="user-profile-link"]')
    members_url = []
    members_usernames = []
    members_desc = []
    index = 1
    for member in members_container:
        user_url =  member.get_attribute("href")
        members_url.append(user_url)
        username = user_url.split("/")[-1]
        members_usernames.append(username)
        try:
            member_bubble = driver.find_element(By.XPATH, f'//*[@id="app-team"]/ul/li[{index}]/div[@class = "bubble"]').text
            members_desc.append(member_bubble)
        except:
            member_bubble = ""
            members_desc.append("")
        index += 1
    
    winners = driver.find_elements(By.XPATH, '//*[@id="submissions"]/ul/li/div/ul/li')
    winners_desc =[]
    isWinner = False
    if(len(winners)>0):
        isWinner = True
        for winner in winners:
            winners_desc.append(winner.text.partition(" ")[2])
    
    tags_container = driver.find_elements(By.XPATH, '//*[@id="built-with"]/ul/li')
    tags =[]
    for tag in tags_container:
        tags.append(tag.text)

    project_desc = driver.find_element(By.XPATH, '//*[@id="app-details-left"]/div[2]').text

    # members info
    for i in range(len(members_url)):
        team_members.append({
            "Project Slug": project_slug,
            "Member Username": members_usernames[i],
            "Member URL": members_url[i],
            "Member Description": members_desc[i] ,
        })

    # team info
    teams.append({
        "Project Slug": project_slug,
        "Is Winner": isWinner,
        "Winners Description": ", ".join(winners_desc),
        "Project Tags": tags,
        "Project Description": project_desc
    })

team_members_df = pd.DataFrame(team_members)
team_members_df.to_csv("Devpost-Datasets/team_members.csv", index=False, encoding="utf-8-sig")

teams_df = pd.DataFrame(teams)
teams_df.to_csv("Devpost-Datasets/teams.csv", index=False, encoding="utf-8-sig")

driver.quit()
print("Scraping done, saved to teams.csv")