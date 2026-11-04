import "../css/Component.css";
import { Link } from "react-router-dom";

function Btn({ text, type, destination }) {
  if (type === "primary") {
    return (
      <Link to={"/take-quiz"} className="home__btn btn__primary">
        {text}
      </Link>
    );
  }

    if (type === "intermediate") {
      return (
        <Link to={`/${destination}`} className="btn btn__intermediate">
          {text}
        </Link>
      );
    }

       if (type === "quick") {
         return (
           <Link to={`/${destination}`} className="btn__quick">
             {text}
           </Link>
         );
       }

  return <Link className="home__btn btn__secondary">{text}</Link>;
}

export default Btn;
