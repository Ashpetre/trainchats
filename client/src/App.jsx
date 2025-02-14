import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.jsx";
import Trains from "./pages/chat.jsx";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/trains">🚆 Trains</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trains" element={<Trains />} />
      </Routes>
    </Router>
  );
}

export default App;
