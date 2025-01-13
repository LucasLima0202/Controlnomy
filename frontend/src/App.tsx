// import React, { useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { useAuth } from "./context/AuthContext";

// const App: React.FC = () => {
//   const { isAuthenticated, setIsAuthenticated } = useAuth();

//   useEffect(() => {
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, [setIsAuthenticated]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <Navigate to="/Dashboard" /> : <Navigate to="/Login" />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Register" element={<Register />} />
//         <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/Login" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


// Editing Dashboard

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";


const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
