import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importando BrowserRouter
import "./styles/fonts.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Ajuste o caminho conforme necessário

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter> {/* O Router deve envolver o AuthProvider */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
