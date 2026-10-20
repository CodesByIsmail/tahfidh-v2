import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "../css/profile.css";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const [curTab, setCurTab] = useState("login");
  const { signUp } = useContext(AuthContext);
  const [authRes, setAuthRes] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleTabSwitch(e) {
    setCurTab(e.target.dataset.tab);
  }

  function onSubmit(data) {
    console.log(data);
    if (curTab === "signup") {
      const res = signUp(data.fullname, data.email, data.password);
      setAuthRes(() => res);
      console.log(res);
    }
  }

  return (
    <div className="profile__page">
      <h1 className="welcome">Welcome</h1>
      <p className="info">
        Log In to save your quiz history and track progress
      </p>

      <div className="form__container">
        <div className="tab__switch">
          <button
            className={
              curTab === "login"
                ? "tab__switchbtn--active tab__switchbtn"
                : "tab__switchbtn"
            }
            onClick={handleTabSwitch}
            data-tab="login"
          >
            Log In
          </button>
          <button
            className={
              curTab === "signup"
                ? "tab__switchbtn--active tab__switchbtn"
                : "tab__switchbtn"
            }
            onClick={handleTabSwitch}
            data-tab="signup"
          >
            Sign Up
          </button>
        </div>

        <form action="auth" onSubmit={handleSubmit(onSubmit)}>
          {curTab === "signup" && (
            <>
              <span
                className={`auth__msg auth__msg${authRes.success ? "--success" : "--fail"} `}
              >
                {authRes.errroMsg}
              </span>

              <div className="input__div">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register("fullname", {
                    required: "Your name is required",
                  })}
                />
                {errors.fullname && (
                  <span className="input__error">
                    {errors.fullname.message}
                  </span>
                )}
              </div>
            </>
          )}
          <div className="input__div">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="input__error">{errors.email.message}</span>
            )}
          </div>
          <div className="input__div">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 8,
                  message: "Password must be less 8 characters",
                },
              })}
            />
            {errors.password && (
              <span className="input__error">{errors.password.message}</span>
            )}
          </div>
          <button type="submit">
            {curTab === "signup" ? "Sign Up" : "Log In"}
          </button>
          <p className="form__enquiry">
            {curTab === "login" ? (
              <>
                Don't have an account?
                <span
                  className="switch__sec"
                  data-tab="signup"
                  onClick={handleTabSwitch}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?
                <span
                  className="switch__sec"
                  data-tab="login"
                  onClick={handleTabSwitch}
                >
                  Log In
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Profile;
