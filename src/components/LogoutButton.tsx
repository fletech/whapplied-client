import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  // const navigate = useNavigate();

  return (
    <button onClick={logout} className="w-auto p-2 font-bold rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
