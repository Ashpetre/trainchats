from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pandas as pd
import joblib

# Load dataset
df = pd.read_csv("train_chatbot_data.csv")

# Vectorize text
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["user_input"])
y = df["response"]

# Train ML model
model = LogisticRegression()
model.fit(X, y)

# Save trained model
joblib.dump(model, "train_chatbot.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
