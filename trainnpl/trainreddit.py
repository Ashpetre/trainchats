import praw 

reddit = praw.Reddit(client_id="your_client_id",
                     client_secret="your_client_secret",
                     user_agent="train-bot")

subreddit = reddit.subreddit("trains")

train_conversations = []
for post in subreddit.hot(limit=50):
    train_conversations.append(f"Question: {post.title}\nResponse: {post.selftext}\n")

with open("reddit_train_data.txt", "w", encoding="utf-8") as file:
    file.write("\n".join(train_conversations))