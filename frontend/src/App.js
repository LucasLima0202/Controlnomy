import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
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
const App = () => {
    return (_jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Initialization, {}) }), _jsx(Route, { path: "/Login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/Register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/Dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/Transactions", element: _jsx(ProtectedRoute, { children: _jsx(Transactions, {}) }) }), _jsx(Route, { path: "/RedirectPage", element: _jsx(ProtectedRoute, { children: _jsx(RedirectPage, {}) }) }), _jsx(Route, { path: "/EditTransactions", element: _jsx(ProtectedRoute, { children: _jsx(EditTransactions, {}) }) }), _jsx(Route, { path: "/StartHere", element: _jsx(ProtectedRoute, { children: _jsx(StartHereForm, {}) }) }), _jsx(Route, { path: "/Settings", element: _jsx(ProtectedRoute, { children: _jsx(SettingsPage, {}) }) })] }) }));
};
export default App;
