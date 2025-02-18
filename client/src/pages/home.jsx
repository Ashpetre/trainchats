import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  
  return (
    <div>
      <div class="hero">
        <h1>Welcome to Train Chat</h1>
        <p>Click on "Trains" to chat about trains!</p>
        <button onClick={() => navigate("/chat")}>TRAINS</button>
      </div>
      
      
      
      

    </div>
  );
}

export default Home;
