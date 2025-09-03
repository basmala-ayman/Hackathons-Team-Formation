import pandas as pd
import glob
import os

# Path where your CSV files are stored
folder_path = "./All-Hackathons"

# Get all CSV files in the folder
csv_files = glob.glob(os.path.join(folder_path, "*.csv"))

# List to hold dataframes
dfs = []

# Loop through CSV files and read them
for i, file in enumerate(csv_files):
    if i == 0:
        # Read the first file including header
        df = pd.read_csv(file)
    else:
        # Read other files skipping the header row
        df = pd.read_csv(file, header=0)
    dfs.append(df)
    print(f'file {i} is done')

# Concatenate all dataframes
merged_df = pd.concat(dfs, ignore_index=True)

# Save merged file
merged_df.to_csv(os.path.join(folder_path, "all-hackathons.csv"), index=False)

print("All CSV files merged successfully into 'merged.csv'")
