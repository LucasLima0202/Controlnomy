import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/fonts.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Ajuste o caminho conforme necessário

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
