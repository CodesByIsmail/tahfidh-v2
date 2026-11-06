import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const safeParse = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      return fallback;
    }
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => safeParse("curUser", null));
  const [isAuth, setIsAuth] = useState(() => Boolean(safeParse("isAuth", false)));
  const [quizInfo, setQuizInfo] = useState(() => safeParse("quizInfo", {}));

  const navigate = useNavigate();

  function signUp(fullname, email, password) {
    const users = safeParse("users", []);
    if (users.find((u) => u.email === email)) {
      return { success: false, errorMsg: "Email already exists" };
    }
    const newUser = { fullname, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("curUser", JSON.stringify(newUser));
    localStorage.setItem("isAuth", JSON.stringify(true));
    setUser(newUser);
    setIsAuth(true);

    return {
      success: true,
      errorMsg: "Account created successfully! Proceed to Login",
    };
  }

  function Login(email, password) {
    const users = safeParse("users", []);
    const curUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!curUser) {
      localStorage.removeItem("curUser");
      setUser(null);
      setIsAuth(false);
      return {
        success: false,
        errorMsg: "User not found, Incorrect password or email!",
      };
    }

    localStorage.setItem("curUser", JSON.stringify(curUser));
    localStorage.setItem("isAuth", JSON.stringify(true));
    setUser(curUser);
    setIsAuth(true);
    navigate("/");

    return { success: true, isAuth: true };
  }

  function Logout() {
    localStorage.removeItem("curUser");
    localStorage.setItem("isAuth", JSON.stringify(false));
    setUser(null);
    setIsAuth(false);
    navigate("/profile");
    return {
      success: true,
      isAuth: false,
      errorMsg: "Successfully logged out",
    };
  }

  function autoAuth() {
    const storedUser = safeParse("curUser", null);
    const storedAuth = Boolean(safeParse("isAuth", false));
    setUser(storedUser);
    setIsAuth(storedAuth && Boolean(storedUser));
  }

  function saveQuizInfo(info) {
    const nextInfo = info ?? {};
    localStorage.setItem("quizInfo", JSON.stringify(nextInfo));
    setQuizInfo(nextInfo);
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        Login,
        saveQuizInfo,
        quizInfo,
        isAuth,
        setIsAuth,
        setUser,
        Logout,
        autoAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
