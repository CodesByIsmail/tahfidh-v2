import { Link } from "react-router-dom";
import "../css/Navbar.css";
import HomeSvg from "../assets/home.svg";
import takequizsvg from "../assets/quiz.svg";
import resultsvg from "../assets/result.svg";
import usersvg from "../assets/user.svg";

function Navbar() {
  function handleClick(e) {
    const navLinks = document.querySelectorAll(".nav__list");
    navLinks.forEach((link) => {
      link.classList.remove("nav__list--active");
    });
    e.target.closest("a").classList.add("nav__list--active");
  }

  return (
    <nav className="nav">
      <div className="nav__menu">
        <Link
          onClick={handleClick}
          className="nav__list nav__list--active"
          to="/"
        >
          <img src={HomeSvg} alt="home-icon" style={{ width: "24px" }} /> Home
        </Link>

        <Link onClick={handleClick} className="nav__list" to="/take-quiz">
          <img src={takequizsvg} alt="home-icon" style={{ width: "24px" }} />{" "}
          Take Quiz
        </Link>

        <Link onClick={handleClick} className="nav__list" to="/results">
          <img src={resultsvg} alt="home-icon" style={{ width: "24px" }} />{" "}
          Result
        </Link>

        <Link onClick={handleClick} className="nav__list" to="/profile">
          <img src={usersvg} alt="home-icon" style={{ width: "24px" }} />
          Profile
        </Link>

        <Link
          onClick={handleClick}
          className="nav__list"
          to="/profile"
          style={{ display: "none" }}
        >
          Sign In
        </Link>

        <Link
          onClick={handleClick}
          className="nav__list"
          to="/profile"
          style={{ display: "none" }}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
