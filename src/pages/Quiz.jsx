import "../css/Quiz.css";
import { useState } from "react";

function Quiz() {
  const [numOfQues, setNumOfQues] = useState(0);
  const [timeLimit, setLimit] = useState(5);
  const [error, setError] = useState("");

  function handleNumQuestion(e) {
    if (!e.target.classList.contains("num__option")) return;
    setNumOfQues(+e.target.innerHTML);
    alert(`${numOfQues}`);
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
          setError("Min reached");
          return timeLimit;
        }
        setError("");
        return timeLimit - 5;
      });
    }

    if (e.target.classList.contains("incr__time")) {
      setLimit((timeLimit) => {
        console.log(timeLimit);
        if (timeLimit === 20) {
          setError("Max reached");
          return timeLimit;
        }
        setError("");
        return timeLimit + 5;
      });
    }
  }

  return (
    <div className="quiz__page">
      <h1 className="quiz__title">Take a Quiz</h1>
      <p className="quiz__description">Set up your session, then begin.</p>

      <form className="quiz__form" action="quiz">
        <div className="form__section">
          <h3 className="form__label">Surah</h3>
          <select className="surah__select" name="Surah">
            <option value="FAtiha">Al-Faatia</option>
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
          <p className="error__msg">{error}</p>
        </div>

        <p className="quiz__preview">
          <span className="preview__text preview__surah">Al-faathia</span>
          <span className="preview__text preview__numofques">
            5 <span>questions</span>
          </span>
          <span className="preview__text preview__time__limit">
            10 <span>minutes</span>
          </span>
        </p>

        <button className="quiz__start" type="submit">
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default Quiz;
