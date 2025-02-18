from serpapi import GoogleSearch

params = {
    "q": "train history and facts",
    "location": "United States",
    "api_key": "your_serpapi_key"
}

search = GoogleSearch(params)
results = search.get_dict()

# Extract search snippets
train_facts = [result["snippet"] for result in results["organic_results"]]

# Save to a file
with open("train_google_data.txt", "w", encoding="utf-8") as file:
    file.write("\n".join(train_facts))

print("Google search data saved!")
