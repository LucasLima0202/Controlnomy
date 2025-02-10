import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Warning from "./Warning";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasConfirmed = sessionStorage.getItem("mobileWarningConfirmed");

    if (!isMobile && !hasConfirmed) {
      setShowWarning(true);
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem("mobileWarningConfirmed", "true");
    setShowWarning(false);
  };

  if (showWarning) {
    return <Warning onConfirm={handleConfirm} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
