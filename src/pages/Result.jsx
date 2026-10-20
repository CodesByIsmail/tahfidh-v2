import { Link } from "react-router-dom";
import "../css/Result.css";
import { useState } from "react";

function Result() {
  const [reviewQuestions, setReviewQuestions] = useState([
    {
      number: 1,
      status: "Correct",
      yourAns: "  مَٰلِكِ يَوْمِ ٱلدِّينِ",
      correctAns: "  مَٰلِكِ يَوْمِ ٱلدِّينِ",
    },
    {
      number: 2,
      status: "Correct",
      yourAns: "  مَٰلِكِ يَوْمِ ٱلدِّينِ",
      correctAns: "  مَٰلِكِ يَوْمِ ٱلدِّينِ",
    },
    {
      number: 3,
      status: "Skipped",
      yourAns: " ",
      correctAns: "  مَٰلِكِ يَوْمِ ٱلدِّينِ",
    },
    {
      number: 4,
      status: "Correct",
      yourAns: "  مَٰلِكِ يَوْمِ ٱلدِّينِ",
      correctAns: "  مَٰلِكِ يَوْمِ ٱلدِّينِ",
    },
  ]);

  function handleExpande(e) {
    console.log(e.target.closest("article").dataset.number);
    const elNeeded = e.target.closest("article");
    const toBeExtended = reviewQuestions.find(
      (ques) => ques.number === +elNeeded.dataset.number,
    );
    console.log(toBeExtended);
    toBeExtended.expanded = !toBeExtended.expanded;
    setReviewQuestions((reviewQuestions) => {
      return [...reviewQuestions]
    })
  }

  return (
    <main className="result-page">
      <h1 className="result-title">Results</h1>

      <section className="summary__container" aria-label="Quiz summary">
        <div className="score-ring">
          <span>60%</span>
        </div>
        <p className="commentary">Good effort</p>
        <p className="summary__info">Surah Al-Faathia · 5 questions</p>

        <div className="summary__score__detail">
          <div className="score__detail score__detail--correct">
            <span>3</span>
            <span>Correct</span>
          </div>
          <div className="score__detail score__detail--wrong">
            <span>1</span>
            <span>Wrong</span>
          </div>
          <div className="score__detail score__detail--skipped">
            <span>1</span>
            <span>Skipped</span>
          </div>
        </div>
      </section>

      <h2 className="review-title">Question review</h2>

      <div className="review__container">
        {reviewQuestions.map(({ number, status, expanded, yourAns, correctAns }) => (
          <article
            data-number={number}
            onClick={handleExpande}
            className="review__div"
            key={number}
          >
            <div className="question__heading">
              <p>Question {number}</p>
              <span
                className={`question__tag question__tag--${status.toLowerCase()}`}
              >
                {status}
              </span>
            </div>
            {expanded && (
              <>
                <div className="answer__div answer__div--yours">
                  <p>Your answer</p>
                  <p className="your__answer__text"> {yourAns ? yourAns : 'No answer picked'} </p>
                </div>
                <div className="answer__div answer__div--correct">
                  <p>Correct answer</p>
                  <p className="correct__answer__text">
                   {correctAns}
                  </p>
                </div>
              </>
            )}
          </article>
        ))}
      </div>

      <div className="after__review__buttons">
        <Link to="/quiz" className="restart-button">
          Restart Quiz
        </Link>
        <Link to="/take-quiz" className="new-quiz-button">
          New Quiz
        </Link>
      </div>
    </main>
  );
}

export default Result;
