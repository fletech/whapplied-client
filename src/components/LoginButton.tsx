import React from "react";
import { useAuth } from "../hooks/useAuth";

const LoginButton: React.FC = () => {
  const { login } = useAuth();

  return (
    <button onClick={login} className="w-auto px-4 py-2 font-bold rounded">
      Login with Google
    </button>
  );
};

export default LoginButton;
