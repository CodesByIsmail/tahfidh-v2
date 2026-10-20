import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signUp(fullname, email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { success: false, errorMsg: "Email already exists" };
    }
    const newUser = { fullname, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(() => newUser);

    return { success: true, errorMsg: "Account created successfully! Proceed to Login" };
  }

  function Login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const curUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!curUser) {
      return {
        success: false,
        errorMsg: "User not found, Incorrect password or email!",
      };
    }

    setUser(() => curUser);
    return { success: true, isAuth: true };
  }

  return (
    <AuthContext.Provider value={{ signUp, user, Login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
