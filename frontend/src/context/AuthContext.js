import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (storedToken) {
            verifySession(storedToken);
        }
    }, []);
    const verifySession = async (storedToken) => {
        try {
            const res = await axios.get("http://localhost:8081/api/auth/session", {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setUser(res.data.user);
            setToken(storedToken);
            // Configurar expiração da sessão para 5 horas
            setTimeout(logout, 5 * 60 * 60 * 1000);
        }
        catch (err) {
            logout();
        }
    };
    const login = async (email, password, rememberMe) => {
        try {
            const res = await axios.post("http://localhost:8081/api/login", { email, password });
            if (res.status === 200 && res.data.token) {
                setUser(res.data.user);
                setToken(res.data.token);
                if (rememberMe) {
                    localStorage.setItem("token", res.data.token);
                }
                else {
                    sessionStorage.setItem("token", res.data.token);
                }
                // Configurar expiração da sessão para 5 horas
                setTimeout(logout, 5 * 60 * 60 * 1000);
                navigate("/Dashboard");
            }
        }
        catch (err) {
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
    return (_jsx(AuthContext.Provider, { value: { user, token, login, logout, verifySession }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
