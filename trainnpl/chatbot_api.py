from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from Node.js

# Load the trained chatbot model
model = joblib.load("train_chatbot.pkl")  # Your model file
vectorizer = joblib.load("vectorizer.pkl")  # TF-IDF vectorizer

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    # Transform user input into numerical representation
    input_vector = vectorizer.transform([user_message])

    # Get model prediction
    bot_response = model.predict(input_vector)[0]

    return jsonify({"reply": bot_response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
