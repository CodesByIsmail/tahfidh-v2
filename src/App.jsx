import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import QuizEngine from "./pages/QuizEngine";

import "./App.css";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <div className="wrapper">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="take-quiz">
              <Route index element={<Quiz />}></Route>
              <Route path="quiz" element={<QuizEngine />}></Route>
            </Route>
            <Route path="/results" element={<Result />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
