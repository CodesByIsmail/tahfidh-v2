import { useContext } from "react";
import logoImage from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate()
      const { user, isAuth } = useContext(AuthContext);

  return (
    <div className="topbar">
      <img className="app__logo" src={logoImage} alt="Tahfidh Logo" />

      {isAuth && (
        <div onClick={()=> navigate('/profile')} className="avatar">
          <span>{user.fullname.split(" ")[0][0]}</span>
        </div>
      )}
    </div>
  );
}

export default TopBar;