import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthContextType {
  user: { id: number; name: string; email: string } | null;
  token: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  verifySession: (storedToken: string) => Promise<void>; // Adicionando verifySession
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken) {
      verifySession(storedToken);
    }
  }, []);

  const verifySession = async (storedToken: string) => {
    try {
      const res = await axios.get("http://localhost:8081/api/auth/session", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setUser(res.data.user);
      setToken(storedToken);

      // Configurar expiração da sessão para 5 horas
      setTimeout(logout, 5 * 60 * 60 * 1000);
    } catch (err) {
      logout();
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const res = await axios.post("http://localhost:8081/api/login", { email, password });
      if (res.status === 200 && res.data.token) {
        setUser(res.data.user);
        setToken(res.data.token);

        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
        } else {
          sessionStorage.setItem("token", res.data.token);
        }

        // Configurar expiração da sessão para 5 horas
        setTimeout(logout, 5 * 60 * 60 * 1000);
        navigate("/Dashboard");
      }
    } catch (err) {
      console.error("Erro ao fazer login", err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, verifySession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
