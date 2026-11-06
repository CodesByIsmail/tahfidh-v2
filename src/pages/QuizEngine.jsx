import "../css/QuizEngine.css";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";


function QuizEngine() {
  const { quizInfo } = useContext(AuthContext);
  const [surah, setSurah] = useState(quizInfo?.surahPicked || "Al-Faathia");
  const [quesBank, setQuesBank] = useState(null);
  const [settingUp, setSettingUp] = useState(true);

  useEffect(() => {
    if (quizInfo?.surahPicked) {
      setSurah(quizInfo.surahPicked);
    }
    console.log(quizInfo);
  }, [quizInfo]);

  useEffect(() => {
    async function fetchAyahs() {
      try {
        const res = await fetch(
          `https://api.qurani.ai/gw/qh/v1/surah/${quizInfo.surahIndex}/quran-uthmani?limit=2000&offset=0`,
        );
        const data = await res.json();
        console.log(data.data.ayahs.map((ayah) => ayah.text));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAyahs();
  }, [surah]);

  async function setQuestionBank() {
    const bank = { questions, options };
  }

  return (
    <div className="quiz__engine">
      {settingUp && (
        <div className="overlay">
          <FaSpinner className="spinner" />
        </div>
      )}

      <div className="top__bar__container">
        <div className="top__bar">
          <div className="top__topbar">
            <span className="close__toggle">X</span>
            <p className="surah">Surah {surah}</p>
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
      {quesBank && (
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
      )}
    </div>
  );
}

export default QuizEngine;
