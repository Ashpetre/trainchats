const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors()); //Allow Frontend Request 
app.use(express.json());

const PORT = process.env.PORT || 5000;
const PYTHON_API_URL = "http://127.0.0.1:5001/chat"; // Flask API endpoint



app.get("/", (req, res) => {
  res.send("Hello from Node.js Backend! 🚀");
});

//Handle chat request
app.post("/chat", async (req, res) => {
  try{
    const userMessage = req.body.message;

    const response = await axios.post(PYTHON_API_URL,{message: userMessage});

    res.json(response.data)
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ response: "Failed to connect to chatbot API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
