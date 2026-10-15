import Btn from "../components/Btn";
import Howitworks from "../components/Howitworks";
import heroImage from '../assets/hero.jpg'

import "../css/Home.css";
function Home() {
  return (
    <main className="home">
      <div className="hero">
        <div className="hero__left">
          <p className="tag__line">Quran Hifdh Practice</p>
          <h2 className="hero__title">Test what you have memorized</h2>
          <p className="hero__description">
            Pick a surah, set a timer and see how well the verses stay with you
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
    </main>
  );
}

export default Home;
