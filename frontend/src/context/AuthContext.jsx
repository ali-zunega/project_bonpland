import { createContext, useEffect, useState } from "react";
import { login as loginService } from "../services/authService"; // 👈 import normal

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 clave

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // 👈 importante
  }, []);

  const login = async (email, password) => {
    const data = await loginService(email, password);

    setUser(data.user); // 🔥 dispara re-render inmediato
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null); // 🔥 re-render inmediato
    localStorage.removeItem("user");
  };

  // 👇 EVITA renders inconsistentes
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};