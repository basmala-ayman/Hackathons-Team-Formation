import requests
import json
import pandas as pd
import time

# List to store hackathon data
hackathons = []

page = 1251
max_pages = 1269

# Loop through multiple pages of the Devpost hackathon API
while page <= max_pages:
    url = f"https://devpost.com/api/hackathons?page={page}"
    
    r = requests.get(url).json()

    # If the "hackathons" key does not exist or is empty, stop fetching more pages
    if not r.get("hackathons"):
        break

    for h in r["hackathons"]:

        gallery_url = h.get("submission_gallery_url")

        # Extract hackathon name from the gallery URL (e.g., "bankofthefuture.devpost.com" → "bankofthefuture")
        hackathon_slug = None
        if gallery_url:
            hackathon_slug = gallery_url.split("//")[1].split(".")[0]

        # Store relevant hackathon details in a dictionary
        hackathons.append({
            "id": h.get("id"),
            "Hackathon Slug": hackathon_slug,  # Extracted hackathon short name
            "Title": h.get("title"),
            "Status": h.get("open_state"),
            "URL": h.get("url"),
            "Submission Period": h.get("submission_period_dates"),
            "Themes": [t["name"] for t in h.get("themes", [])],  # List of hackathon themes
            "Prize Amount": h.get("prize_amount").split('>')[1].split('<')[0].replace(",", ""),
            "Registrations Count": h.get("registrations_count"),
            "Organization": h.get("organization_name"),
            "Winners Announced": h.get("winners_announced"),
            "Projects Gallery": gallery_url,
        })
    print(f'#page -> {page}')
    page += 1
    
    # Sleep to avoid sending too many requests in a short time (polite scraping)
    time.sleep(1)

df = pd.DataFrame(hackathons)

# Save the results to a CSV file (UTF-8 encoded)
df.to_csv("hackathons-25.csv", index=False, encoding="utf-8")

# Print final summary
print("Finished! Total ended hackathons collected:", len(df))
