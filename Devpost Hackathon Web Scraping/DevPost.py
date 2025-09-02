import requests
import json
import pandas as pd
import time

# List to store hackathon data
hackathons = []

# Start scraping from page 20 up to 50 (Devpost API supports pagination)
page = 20
max_pages = 50

# Loop through multiple pages of the Devpost hackathon API
while page <= max_pages:
    # Construct API URL with current page number
    url = f"https://devpost.com/api/hackathons?page={page}"
    
    # Request data from the API and convert it to JSON
    r = requests.get(url).json()

    # If the "hackathons" key does not exist or is empty, stop fetching more pages
    if not r.get("hackathons"):
        break

    # Iterate through each hackathon entry in the response
    for h in r["hackathons"]:
        # Only collect hackathons that have ended
        if h.get("open_state") == "ended":
            gallery_url = h.get("submission_gallery_url")

            # Extract hackathon name from the gallery URL (e.g., "bankofthefuture.devpost.com" → "bankofthefuture")
            hackathon_name = None
            if gallery_url:
                hackathon_name = gallery_url.split("//")[1].split(".")[0]

            # Store relevant hackathon details in a dictionary
            hackathons.append({
                "id": h.get("id"),  # Hackathon ID
                "title": h.get("title"),  # Hackathon title
                "organization": h.get("organization_name"),  # Hosting organization
                "themes": [t["name"] for t in h.get("themes", [])],  # List of hackathon themes
                "registrations": h.get("registrations_count"),  # Number of participants/registrations
                "gallery_url": gallery_url,  # Link to submission gallery
                "hackathon_name": hackathon_name,  # Extracted hackathon short name
                "submission_period": h.get("submission_period_dates")  # Date range for submissions
            })

    # Print progress update for current page
    print(f"Page {page} done, total so far: {len(hackathons)}")

    # Move to next page
    page += 1
    
    # Sleep to avoid sending too many requests in a short time (polite scraping)
    time.sleep(1)

# Convert collected data into a Pandas DataFrame
df = pd.DataFrame(hackathons)

# Show the first few rows for verification
print(df.head())

# Save the results to a CSV file (UTF-8 encoded)
df.to_csv("ended_hackathons.csv", index=False, encoding="utf-8")

# Print final summary
print("Finished! Total ended hackathons collected:", len(df))
