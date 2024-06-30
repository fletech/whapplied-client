import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { SessionContext } from "../context/sessionContext";

const AuthButton = () => {
  const { sessionState } = useContext(SessionContext);
  const isLoggedIn = sessionState.user !== null;

  const { login, logout } = useAuth();
  const action = isLoggedIn ? logout : login;
  const label = isLoggedIn ? "Logout" : "Login with Google";

  return (
    <button onClick={action} className="w-auto p-2 font-bold rounded">
      {label}
    </button>
  );
};

export default AuthButton;
