import "../css/Component.css";
import { Link } from "react-router-dom";

function Btn({ text, type, destination }) {
  if (type === "primary") {
    return (
      <Link to="/take-quiz" className="home__btn btn__primary">
        {text}
      </Link>
    );
  }

  if (type === "intermediate") {
    return (
      <Link to={destination ? `/${destination}` : "/take-quiz"} className="btn btn__intermediate">
        {text}
      </Link>
    );
  }

  if (type === "quick") {
    return (
      <Link to={destination ? `/${destination}` : "/take-quiz"} className="btn__quick">
        {text}
      </Link>
    );
  }

  if (type === "secondary") {
    return (
      <Link to="/profile" className="home__btn btn__secondary">
        {text}
      </Link>
    );
  }

  return <Link to="/" className="home__btn btn__secondary">{text}</Link>;
}

export default Btn;
