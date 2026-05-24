import { createContext, useContext, useState } from "react";

// Hardcoded credentials — change these to your own
const ADMIN_USER = "admin";
const ADMIN_PASS = "mobilecare@2025";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("mc_admin") === "1");

  const login = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("mc_admin", "1");
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("mc_admin");
    setAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
