import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import QuizEngine from "./pages/QuizEngine";
import "./App.css";

function App() {
  return (
    <div>
      <h1 className="logo">Tahfidh</h1>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/take-quiz" element={<Quiz />}></Route>
        <Route path="/results" element={<Result />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/quiz" element={<QuizEngine />}></Route>
      </Routes>
    </div>
  );
}

export default App;
