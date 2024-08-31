import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../context/sessionContext";

const AuthGuard = ({ children }) => {
  const { sessionState } = useSession();

  if (!sessionState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;
