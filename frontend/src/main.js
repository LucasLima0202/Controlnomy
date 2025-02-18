import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importando BrowserRouter
import "./styles/fonts.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Ajuste o caminho conforme necessário
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsxs(BrowserRouter, { children: [" ", _jsx(AuthProvider, { children: _jsx(App, {}) })] }) }));
