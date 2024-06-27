import React from "react";
import { useAuth } from "../hooks/useAuth";

const AuthButton = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const action = isLoggedIn ? logout : login;
  const label = isLoggedIn ? "Logout" : "Login with Google";

  return (
    <button onClick={action} className="w-auto p-2 font-bold rounded">
      {label}
    </button>
  );
};

export default AuthButton;
