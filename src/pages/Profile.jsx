import { useState } from "react";
import "../css/profile.css";
function Profile() {
  const [curTab, setCurTab] = useState("signin");
  function handleTabSwitch(e) {
    setCurTab(e.target.dataset.tab);
  }
  return (
    <div className="profile__page">
      <h1 className="welcome">Welcome</h1>
      <p className="info">
        Sign in to save your quiz history and track progress
      </p>

      <div className="form__container">
        <div className="tab__switch">
          <button
            className={
              curTab === "signin" && "tab__switchbtn--active tab__switchbtn"
            }
            onClick={handleTabSwitch}
            data-tab="signin"
          >
            Sign In
          </button>
          <button
            className={
              curTab === "signup" && "tab__switchbtn--active tab__switchbtn"
            }
            onClick={handleTabSwitch}
            data-tab="signup"
          >
            Sign Up
          </button>
        </div>

        <form action="signup/signin">
          {curTab === "signup" && (
            <>
              <div className="input__div">
                <label htmlFor="fullname">Full Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="input__div">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="you@example.com" />
              </div>
              <div className="input__div">
                <label htmlFor="password">Password</label>
                <input type="text" placeholder="At least 8 characters" />
              </div>
              <button type="submit">Sign Up</button>
              <p className="form__enquiry">
                Already have an account?{" "}
                <span
                  className="switch__sec"
                  data-tab="signin"
                  onClick={handleTabSwitch}
                >
                  Sign In
                </span>
              </p>
            </>
          )}

          {curTab === "signin" && (
            <>
              <div className="input__div">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="you@example.com" />
              </div>
              <div className="input__div">
                <label htmlFor="password">Password</label>
                <input type="text" placeholder="At least 8 characters" />
              </div>
              <button type="submit">Sign In</button>
              <p className="form__enquiry">
                Don't have an account?{" "}
                <span
                  className="switch__sec"
                  data-tab="signup"
                  onClick={handleTabSwitch}
                >
                  Sign Up
                </span>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
