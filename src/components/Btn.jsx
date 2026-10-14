import "../css/Component.css";
import { Link } from "react-router-dom";

function Btn({ text, type }) {
  if (type === "primary") {
    return (
      <Link to={"/take-quiz"} className="btn__primary">
        {text}
      </Link>
    );
  }

  return <Link className="btn__secondary">{text}</Link>;
}

export default Btn;
