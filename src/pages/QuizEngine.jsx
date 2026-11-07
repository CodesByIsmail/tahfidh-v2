import "../css/QuizEngine.css";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";

function QuizEngine() {
  const { quizInfo } = useContext(AuthContext);
  const [surah, setSurah] = useState(quizInfo?.surahPicked || "Al-Faathia");
  const [ayahs, setAyahs] = useState([]);
  const [quesBank, setQuesBank] = useState(null);
  const [settingUp, setSettingUp] = useState(true);
  const [isReady, setIsReady] = useState(false);


  const [curNum, setCurNum] = useState(1);
  const [numOfQues, setNumOfQues] = useState(5)

  useEffect(() => {
    async function fetchAyahs() {
      try {
        const res = await fetch(
          `https://api.qurani.ai/gw/qh/v1/surah/${quizInfo.surahIndex}/quran-uthmani?limit=2000&offset=0`,
        );
        const data = await res.json();
        setAyahs(() => data.data.ayahs.map((ayah) => ayah.text));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAyahs();
  }, []);

  useEffect(() => {
    setQuestionBank();
  }, [ayahs]);

  function setQuestionBank() {
    const bank = [{ q: "", p: [] }];
    const possibleQues = ayahs.slice(0, -1);
    const maxNumQues = possibleQues.length;

    const actualNumOfQues = Math.min(maxNumQues, quizInfo.numOfQues);
  
    setNumOfQues(actualNumOfQues)
    const questions = possibleQues.slice(0, actualNumOfQues);
    questions.forEach((q, i) => {
      const ans = ayahs[ayahs.findIndex((a) => a === q) + 1];
      bank[i] = { q: q, ans };
    });

    bank.map((b, i) => (b.q = possibleQues[i]));
    console.log(bank);
    setQuesBank(bank)


    
  }

  function setOptions(){

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
            {quesBank &&
              quesBank.map((_, i) => {
                return (
                  <span
                    className={`question__navigator question__navigator${i+1 === curNum ? "--active" : ""}`}
                    key={i}
                  >
                    {i + 1}
                  </span>
                );
              })
            }
          </div>
          <p>Question 1 of {numOfQues}</p>
        </div>
      </div>
      {quesBank && (
        <div className="quiz__page">
          <p>What is the next verse?</p>
          <div className="question">
            <p>{quesBank[curNum-1].q}</p>
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
