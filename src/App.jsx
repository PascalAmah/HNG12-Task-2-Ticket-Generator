import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import MyTickets from "./components/MyTickets";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#041518]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-tickets" element={<MyTickets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
