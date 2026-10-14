import Btn from "../components/Btn";
import Howitworks from "../components/Howitworks";

import "../css/Home.css";
function Home() {
  return (
    <main className="home">
      <div className="hero">
        <p className="tag__line">Quran Hifdh Practice</p>
        <h2 className="hero__title">Test what you have memorized</h2>
        <p className="hero__description">
          Pick a surah, set a timer and see how well the verses stay with you
        </p>
        <Btn text={"Start a Quiz"} type={"primary"} />
        <Btn text={"How it Works"} type={"secondary"} />
      </div>

      <div className="howitworks__container">
        <h2 className="howitworks__heading">How it works</h2>
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
    </main>
  );
}

export default Home;
