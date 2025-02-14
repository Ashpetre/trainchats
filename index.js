const express = require("express");
const cors = require("cors");




const app = express();
app.use(cors()); //Allow Frontend Request 
app.use(express.json());

const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
  res.send("Hello from Node.js Backend! 🚀");
});

//Handle chat request
app.post("/chat", async (req, res) => {
  console.log("Received request:", req.body); // Log request
  const { message } = req.body;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "llama2:chat", prompt: message, stream: false }),
    });

    const data = await response.json();
    console.log("Ollama Response:", data); // Log AI response

    res.json({ response: data.response });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ response: "AI server is unavailable." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
