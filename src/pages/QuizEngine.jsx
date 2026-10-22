import "../css/QuizEngine.css";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

function QuizEngine() {
  const { quizInfo } = useContext(AuthContext);
  const [surah, setSurah] = useState("");

  window.addEventListener("load", (e) => {
    const url = new URL(e.target.location.href);
    const value = url.searchParams.get("SurahPicked");
    console.log(value);
    setSurah(value);
  });

  useEffect(() => {
    async function fetchAyahs() {
      try {
        const res = await fetch(
          "https://api.qurani.ai/gw/qh/v1/surah/1/quran-uthmani?limit=2000&offset=0",
        );
        const data = await res.json();
        console.log(data.data.ayahs.map(surah => surah.text));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAyahs();
  }, []);

  return (
    <div className="quiz__engine">
      <div className="top__bar__container">
        <div className="top__bar">
          <div className="top__topbar">
            <span className="close__toggle">X</span>
            <p className="surah">Surah Al-Faatiha</p>
            <p className="timer">
              <span className="minute">09</span>:
              <span className="seconds">59</span>
            </p>
          </div>
          <div className="question__navigators">
            <span className="question__navigator question__navigator--active">
              1
            </span>
            <span className="question__navigator">2</span>
            <span className="question__navigator">3</span>
            <span className="question__navigator">4</span>
            <span className="question__navigator">5</span>
          </div>
          <p>Question 1 of 5</p>
        </div>
      </div>

      <div className="quiz__page">
        <p>What is the next verse?</p>
        <div className="question">
          <p>inna aaina</p>
        </div>

        <div className="options">
          <div className="option__div">
            <p>alhamdulillah</p>
          </div>
          <div className="option__div">
            <p>alhamdulillah</p>
          </div>
          <div className="option__div">
            <p>alhamdulillah</p>
          </div>
          <div className="option__div">
            <p>alhamdulillah</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizEngine;
