import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.jsx";
import Chat from "./pages/chat.jsx";
import "./styles/home.css";

function App() {
  return (
    <Router>
      <nav>
        <ul class="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/chat">Chat</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
