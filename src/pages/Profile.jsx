import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../css/profile.css";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const [curTab, setCurTab] = useState("login");
  const { signUp, Login, user, isAuth, Logout, autoAuth } =
    useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const [authRes, setAuthRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(5);

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
    setLoading(true);
    let result;

    if (curTab === "signup") {
      signUserUp(data);
    }

    async function signUserUp(data) {
      try {
        setResponse(null);
        await timeout(5);
        result = signUp(data.fullname, data.email, data.password);
        if (!result.success) throw new Error(result.errorMsg);
        await logUserIn(data);
      } catch (err) {
      } finally {
        setResponse(result);
        setLoading(false);
      }
    }

    async function logUserIn(data) {
      try {
        setResponse(null);

        localStorage.setItem("isAuth", isAuth);
        await timeout(5);
        result = Login(data.email, data.password);
        console.log(isAuth);
        if (!result.success) throw new Error(result.errorMsg);
      } catch (err) {
      } finally {
        console.log(result);
        setResponse(result);
        setLoading(false);
      }
    }

    if (curTab === "login") {
      logUserIn(data);
    }
  }

 async function logUserOut(){
    try{
      setLoading(true)
      await timeout(5)
      Logout();
    } finally{
      setLoading(false)
    }
  }

  function timeout(sec) {
    return new Promise((resolve) => {
      setTimeout(resolve, sec * 1000);
    });
  }

  window.addEventListener("load", autoAuth);

  return (
    <div className="profile__page">
      {isAuth && (
        <>
          <h1>Assalamu Alaykum {user ? user.fullname.split(" ")[0] : ""}</h1>

          <div className="profiles__ingo">
            <div>
              <h3>Account Information</h3>
              <p>Personal Info, Profile Picture, Password</p>
            </div>
          </div>

          <button className="logout__btn" onClick={logUserOut} disabled={loading} type="submit">
            {loading ? "Connecting" : "Logout"}
          </button>
        </>
      )}
      {!isAuth && (
        <>
          <h1 className="welcome">Welcome </h1>
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
              {response && (
                <span
                  className={`auth__msg auth__msg${response.success ? "--success" : "--fail"} `}
                >
                  {response.errorMsg}
                </span>
              )}
              {curTab === "signup" && (
                <>
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
                  <span className="input__error">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <button className="form__btn" disabled={loading} type="submit">
                {curTab === "signup"
                  ? `${loading ? "Connecting ..." : "Sign Up"}`
                  : `${loading ? "Connecting ..." : "Log In"}`}
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
        </>
      )}
    </div>
  );
}

export default Profile;
