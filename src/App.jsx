import { React } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MemoryGame } from "./pages/memorygame";
import { LeaderBoard } from "./Pages/LeaderBoard";
import { About } from "./Pages/About";

import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memorycage" element={<MemoryGame />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
