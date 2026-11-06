import { useContext, useEffect } from "react";
import Btn from "../components/Btn";
import Howitworks from "../components/Howitworks";
import heroImage from "../assets/hero.jpg";
import { AuthContext } from "../context/AuthContext";

import "../css/Home.css";
function Home() {
  const { user, isAuth, autoAuth } = useContext(AuthContext);

  useEffect(() => {
    autoAuth();
  }, [autoAuth]);

  const userFirstName = user?.fullname?.split(" ")[0] || "friend";

  return (
    <main className="home">
      {isAuth && user && (
        <>
          <div className="hero">
            <div className="hero__left">
              <h1>AsSalaamu Alaykum {userFirstName}</h1>
              <p>
                Ready for today’s revision? Pick a surah and test your hifdh.
              </p>
              <Btn text={"Start a Quiz"} type={"primary"} />
            </div>
          </div>

          <div className="overviews">
            <div className="overview">
              <h2>24</h2>
              <p>Quizzes taken</p>
            </div>

            <div className="overview">
              <h2>
                76 <span>%</span>
              </h2>
              <p>Average Score</p>
            </div>

            <div className="overview">
              <h2>
                100 <span>%</span>
              </h2>
              <p>Best score</p>
            </div>

            <div className="overview">
              <h2>6</h2>
              <p>Surah tested</p>
            </div>
          </div>

          <section className="recent__results">
            <h3 className="title">Recent results</h3>

            <div className="results">
              <div className="result">
                <div className="left">
                  <h3 className="surahName">Al-Faatiha</h3>
                  <p className="detail">
                    <span>5</span> questions <span className="date">Today</span>
                  </p>
                </div>

                <p className={`score`}>
                  80 <span>%</span>
                </p>
              </div>
              <div className="result">
                <div className="left">
                  <h3 className="surahName">Al-Ikhlaas</h3>
                  <p className="detail">
                    <span>10</span> questions
                    <span className="date">Yesterday</span>
                  </p>
                </div>

                <p className={`score`}>
                  100 <span>%</span>
                </p>
              </div>

              <div className="result">
                <div className="left">
                  <h3 className="surahName"> Al-Mulk</h3>
                  <p className="detail">
                    <span>10</span> questions
                    <span className="date"> 2 days ago</span>
                  </p>
                </div>

                <p className={`score`}>
                  100 <span>%</span>
                </p>
              </div>
            </div>
          </section>

          <section className="quick__start">
            <h3 className="title">Quick Start</h3>

            <div className="quickies">
              <Btn
                text={"Al-Faathia"}
                type={"quick"}
                destination={"take-quiz"}
              />

              <Btn
                text={"Al-Ikhlaas"}
                type={"quick"}
                destination={"take-quiz"}
              />

              <Btn text={"Al-Mulk"} type={"quick"} destination={"take-quiz"} />

              <Btn text={"Yaaseen"} type={"quick"} destination={"take-quiz"} />
            </div>
            <Btn
              text={"Take a Quiz"}
              type={"intermediate"}
              destination={"take-quiz"}
            />
          </section>
        </>
      )}

      {!isAuth && (
        <>
          <div className="hero">
            <div className="hero__left">
              <h1>Welcome {isAuth && user ? user.fullname : ""}</h1>
              <p className="tag__line">Quran Hifdh Practice</p>
              <h2 className="hero__title">Test what you have memorized</h2>
              <p className="hero__description">
                Pick a surah, set a timer and see how well the verses stay with
                you
              </p>
              <div className="hero__ctas">
                <Btn text={"Start a Quiz"} type={"primary"} />
                <Btn text={"How it Works"} type={"secondary"} />
              </div>
            </div>
            <div className="hero__img__container">
              <img className="hero__img" src={heroImage} alt="hero-image" />
            </div>
          </div>

          <div className="howitworks__container">
            <h2 className="howitworks__heading">How it works</h2>
            <div className="howitworks__wrapper">
              <Howitworks
                number={"1"}
                title={"Choose a surah"}
                text={"Select what you want to tested on"}
              />
              <Howitworks
                number={"2"}
                title={"Answer against the clock"}
                text={"Complete the verses within your time"}
              />
              <Howitworks
                number={"3"}
                title={"Review your results"}
                text={"See what you missed and try again"}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Home;
