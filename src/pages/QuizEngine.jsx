import "../css/QuizEngine.css";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { rndNumber, timeout } from "../config";

function QuizEngine() {
  const { quizInfo } = useContext(AuthContext);
  const [surah, setSurah] = useState(quizInfo?.surahPicked || "Al-Faathia");
  const [ayahs, setAyahs] = useState([]);
  const [quesBank, setQuesBank] = useState(null);

  const [sec, setSec] = useState(0)


  const [settingUp, setSettingUp] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const [sessionInfo, setSessionInfo] = useState(
    JSON.parse(localStorage.getItem("sessionInfo") || null),
  );

  const [curNum, setCurNum] = useState(sessionInfo?.curNum || 1);
  const [numOfQues, setNumOfQues] = useState(sessionInfo?.numOfQues || 5);

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
    setUp();
  }, [ayahs]);

  useEffect(() => {
    startTimer(quizInfo.timeLimit);
  }, [isReady, quizInfo]);

  async function setUp() {
    setQuestionBank();
    await timeout(3);
    setSettingUp(false);
    setIsReady(true);
  }

  function startTimer(minute) {
    let sec = minute * 60;
    setInterval(() => {
      sec--;
      setSec(sec)
      console.log(sec);
    }, 1000);
  }

  function setQuestionBank() {
    const bank = [{ q: "", p: [] }];
    const possibleQues = ayahs.slice(0, -1);
    const maxNumQues = possibleQues.length;

    const actualNumOfQues = Math.min(maxNumQues, quizInfo.numOfQues);

    setNumOfQues(actualNumOfQues);
    const questions = possibleQues.slice(0, actualNumOfQues);
    questions.forEach((q, i) => {
      const ans = ayahs[ayahs.findIndex((a) => a === q) + 1];
      bank[i] = { q: q, ans };
    });

    bank.map((b, i) => (b.q = possibleQues[i]));
    console.log(bank);

    if (bank) {
      bank.forEach((qBank) => {
        const options = setOptions(qBank);
        qBank.opts = options;
        return setOptions(qBank);
      });
    }
    setQuesBank(bank);
  }

  function setOptions(qBank) {
    const optArr = [1, 2, 3];

    const options = optArr.map((opt) => {
      const rndNum = rndNumber(ayahs.length);
      return ayahs[rndNum];
    });

    return [...options, qBank.ans];
  }

  function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      console.log(i, j);

      // [(arr[i], arr[j])] = [arr[j], arr[i]];
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
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
              <span className="minute">{Math.floor(sec/60)}</span>:
              <span className="seconds">{sec}</span>
            </p>
          </div>
          <div className="question__navigators">
            {quesBank &&
              quesBank.map((_, i) => {
                return (
                  <span
                    className={`question__navigator question__navigator${i + 1 === curNum ? "--active" : ""}`}
                    key={i}
                  >
                    {i + 1}
                  </span>
                );
              })}
          </div>
          <p>Question 1 of {numOfQues}</p>
        </div>
      </div>
      {quesBank && (
        <div className="quiz__page">
          <p>What is the next verse?</p>
          <div className="question">
            <p>{quesBank[curNum - 1].q}</p>
          </div>

          <div className="options">
            {quesBank[curNum - 1].opts.map((opt, i) => {
              return (
                <div key={`${opt}${i}`} className="option__div">
                  <p>{opt}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizEngine;
