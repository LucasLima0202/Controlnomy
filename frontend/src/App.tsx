import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import EditTransactions from "./pages/EditTransactions";
import StartHereForm from "./pages/Start";
import RedirectPage from "./pages/Redirect";
import SettingsPage from "./pages/Settings";
import ProtectedRoute from "./hooks/ProtectedRoute";
import Initialization from "./pages/Initialization";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Initialization />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/RedirectPage"
            element={
              <ProtectedRoute>
                <RedirectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EditTransactions"
            element={
              <ProtectedRoute>
                <EditTransactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/StartHere"
            element={
              <ProtectedRoute>
                <StartHereForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
};

export default App;
