import "../css/Quiz.css";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import Btn from "../components/Btn";
import { Link } from "react-router-dom";

function Quiz() {
  const [numOfQues, setNumOfQues] = useState(5);
  const [timeLimit, setLimit] = useState(5);
  const [surahPicked, setSurahPicked] = useState("Al-Faathia");
  const [timerError, setTimerError] = useState("");

  const [surahs, setSurahs] = useState([]);
  const [error, setError] = useState("");

  const [loading, setloading] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});

  const { saveQuizInfo, isAuth } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const res = await fetch(
          "https://api.qurani.ai/gw/qh/v1/surah?limit=2000&offset=0",
        );
        if (!res.ok) throw new Error("Network respons");
        const resultData = await res.json();
        console.log(resultData.data);
        setSurahs(resultData.data);
      } catch (err) {
        setError(err);
      } finally {
        setloading(false);
      }
    }

    fetchData();
  }, []);

  function handleNumQuestion(e) {
    if (!e.target.classList.contains("num__option")) return;
    setNumOfQues(+e.target.innerHTML);
    const allQuesCounts = document.querySelectorAll(".num__option");
    allQuesCounts.forEach((span) =>
      span.classList.remove("num__option--active"),
    );
    e.target.classList.add("num__option--active");
  }

  function handleTimerClick(e) {
    if (e.target.classList.contains("decr__time")) {
      setLimit((timeLimit) => {
        console.log(timeLimit);
        if (timeLimit === 5) {
          setTimerError("Min reached");
          return timeLimit;
        }
        setTimerError("");
        return timeLimit - 5;
      });
    }

    if (e.target.classList.contains("incr__time")) {
      setLimit((timeLimit) => {
        console.log(timeLimit);
        if (timeLimit === 20) {
          setTimerError("Max reached");
          return timeLimit;
        }
        setTimerError("");
        return timeLimit + 5;
      });
    }
  }

  function handleSelectChange(e) {
    setSurahPicked(e.target.value);
  }

  function handleSubmit(e) {
    const info = { surahPicked, timeLimit, numOfQues };
    setQuizInfo(() => info);
    console.log(info);
    saveQuizInfo(info);
  }

  return (
    <div className="quiz__page">
      <h1 className="quiz__title">Take a Quiz</h1>
      <p className="quiz__description">
        Set up your session, then begin.{" "}
        {!isAuth ? `Login to save your progress` : ""}
      </p>

      <form
        className="quiz__form"
        action="take-quiz/quiz"
        onSubmit={handleSubmit}
      >
        <div className="form__section">
          <h3 className="form__label">Surah</h3>
          <select
            onChange={handleSelectChange}
            className="surah__select"
            name="SurahPicked"
            value={surahPicked}
          >
            {surahs.map((surah) => {
              return (
                <option key={surah.number} value={surah.englishName}>
                  {surah.englishName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form__section">
          <h3 className="form__label">Number of questions</h3>
          <div onClick={handleNumQuestion} className="num__ofques">
            <span className="num__option num__option--active">5</span>
            <span className="num__option">10</span>
            <span className="num__option">15</span>
            <span className="num__option">20</span>
          </div>
        </div>
        <div className="form__selection">
          <h3 className="form__label">Time limit</h3>
          <div className="time__limit__container">
            <button
              onClick={handleTimerClick}
              className="decr__time"
              type="button"
            >
              -
            </button>
            <span className="time__limit">
              {timeLimit} <span>min</span>
            </span>

            <button
              onClick={handleTimerClick}
              className="incr__time"
              type="button"
            >
              +
            </button>
          </div>
          <p className="error__msg">{timerError}</p>
        </div>

        <p className="quiz__preview">
          <span className="preview__text preview__surah">{surahPicked}</span>
          <span className="preview__text preview__numofques">
            {numOfQues} <span>questions</span>
          </span>
          <span className="preview__text preview__time__limit">
            {timeLimit} <span>minutes</span>
          </span>
        </p>

        <button className="quiz__start" disabled={loading} type="submit">
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default Quiz;
