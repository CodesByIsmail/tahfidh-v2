import '../css/QuizEngine.css'
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

function QuizEngine() {
    const {quizInfo} =useContext(AuthContext)
    console.log(quizInfo)

    return (
        <div className='quiz__engine'>
            <div className="top__bar__container">
                <div className="top__bar">
                    <div className="top__topbar">
                        <span className="close__toggle">X</span>
                        <p className="surah">Surah Al-Faatiha</p>
                        <p className="timer"><span className="minute">09</span>:<span className="seconds">59</span></p>

                    </div>
                    <div className="question__navigators">
                        <span className="question__navigator question__navigator--active">1</span>
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

                <div className='options'>
                    <div className="option__div">
                        <p>alhamdulillah</p>
                    </div><div className="option__div">
                        <p>alhamdulillah</p>
                    </div><div className="option__div">
                        <p>alhamdulillah</p>
                    </div><div className="option__div">
                        <p>alhamdulillah</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizEngine