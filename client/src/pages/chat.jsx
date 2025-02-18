import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatboxRef = useRef(null);
  const trainRef = useRef(null);
  const warningSound = new Audio("/warning.mp3"); // Add a warning sound in `public/` folder

  const trainKeywords = ["train", "railway", "locomotive", "track", "subway", "metro", "station", "bullet train"];
  

  // Move train around while avoiding the chatbox
  const moveTrain = () => {
    const train = trainRef.current;
    const chatbox = chatboxRef.current;
    if (!train || !chatbox) return;

    let newX = Math.random() * (window.innerWidth - 150);
    let newY = Math.random() * (window.innerHeight - 80);

    const trainRect = train.getBoundingClientRect();
    const chatboxRect = chatbox.getBoundingClientRect();

    if (
      newX < chatboxRect.right &&
      newX + trainRect.width > chatboxRect.left &&
      newY < chatboxRect.bottom &&
      newY + trainRect.height > chatboxRect.top
    ) {
      moveTrain();
      return;
    }

    gsap.to(train, {
      x: newX,
      y: newY,
      duration: 2,
      ease: "power1.inOut",
      onComplete: moveTrain,
    });
  };

  useEffect(() => {
    moveTrain();
  }, []);

  // Send message to the AI and get a response
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { sender: "You", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    const isTrainQuestion = trainKeywords.some((word) => userInput.toLowerCase().includes(word));

    if (!isTrainQuestion) {
      chatboxRef.current.classList.add("error-background");
      warningSound.play();
      gsap.to(chatboxRef.current, { x: -10, repeat: 3, yoyo: true, duration: 0.1 });

      setTimeout(() => {
        chatboxRef.current.classList.remove("error-background");
      }, 2000);
    }

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { sender: "AI", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { sender: "Error", text: "Unable to connect to server." }]);
    }
  };

  return (
    <div ref={chatboxRef} className="chatbox">
      <h2>🚂 Train AI Chatbox</h2>
      <h3>Welcome to my train Ai bot. You are only allowed to ask question related to trains. you will be trained down if you askk any other questions</h3>

      {/* Moving Train */}
      <img ref={trainRef} src="/train.jpg" alt="Train" className="train" />

      {/* Chat Messages */}
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={`message ${msg.sender === "You" ? "user-message" : "ai-message"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      {/* Input & Send Button */}
      <input
        type="text"
        placeholder="Ask only about trains 🚂"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send 💬</button>
    </div>
  );
}

export default Chat;
