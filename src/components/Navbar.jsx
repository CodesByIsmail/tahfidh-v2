import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import HomeSvg from "../assets/home.svg";
import takequizsvg from "../assets/quiz.svg";
import resultsvg from "../assets/result.svg";
import usersvg from "../assets/user.svg";
import logoImage from "../assets/logo.png";


function Navbar() {
  return (
    <nav className="nav">
       <img
        className="app__logo"
        src={logoImage}
        alt="Tahfidh"
      />

      <div className="nav__menu">
        <NavLink
          className={({ isActive }) =>
            `nav__list${isActive ? " nav__list--active" : ""}`
          }
          to="/"
        >
          <img src={HomeSvg} alt="" /> Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav__list${isActive ? " nav__list--active" : ""}`
          }
          to="/take-quiz"
        >
          <img src={takequizsvg} alt="" />
          Take Quiz
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav__list${isActive ? " nav__list--active" : ""}`
          }
          to="/results"
        >
          <img src={resultsvg} alt="" />
          Results
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav__list${isActive ? " nav__list--active" : ""}`
          }
          to="/profile"
        >
          <img src={usersvg} alt="" />
          Profile
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
