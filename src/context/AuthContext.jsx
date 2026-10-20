import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signUp(fullname, email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { success: false, errroMsg: "Email already exists" };
    }
    const newUser = { fullname, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(() => newUser);
    
    return { success: true, errroMsg: "Account created successfully!" };
  }

  function Login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    curUser = users.find((u) => u.email === email && u.password === password);
    if (!curUser) {
      return {
        success: false,
        error: "User not found, Incorrect password or email",
      };
    }
    return { success: true };
  }
  return (
    <AuthContext.Provider value={{ signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
