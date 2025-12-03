from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd

df = pd.read_csv("Devpost-Datasets/hackathon-projects.csv")
hackathons_ID = df["Hackathon ID"]
# projects_slug = df["Project Slug"]
df = df["Project Link"]
df = df.iloc[0:5]

# Open browser
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 5)

teams = []
team_members = []

for i in range(len(df)):
    driver.get(df.iloc[i])

    # wait for project page to fully load
    try:
        wait.until(
            EC.presence_of_all_elements_located((By.XPATH, '//*[@id="container"]'))
        )
    except:
        print(f"No team members found for project {df.iloc[i]}")
        continue


    project_slug = df[i].split("/")[-1]
    hackathon_ID = hackathons_ID.iloc[i]

    members_container = driver.find_elements(By.XPATH, '//*[@id="app-team"]/ul/li/div/div/figure')
    members_url = []
    members_usernames = []
    members_desc = []
    index = 1
    for member in members_container:
        try:
            # normal user
            a_tag = member.find_element(By.XPATH, ".//a")
            user_url =  a_tag.get_attribute("href")
            members_url.append(user_url)
            username = user_url.split("/")[-1]
            members_usernames.append(username)
        except:
            # check for private user
            try:
                # private user
                span_tag = member.find_element(By.XPATH, ".//span")
                user_url =  "private user"
                members_url.append(user_url)
                username = "private user"
                members_usernames.append(username)
            except:
                members_url.append("")
                members_usernames.append("")
        
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
        "Hackathon ID": hackathon_ID,
        "Project Slug": project_slug,
        "Members Count": len(members_url),
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