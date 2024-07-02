import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { SessionContext } from "../context/sessionContext";

const styles = {
  small: "text-xs text-gray-500",
  medium: "text-sm",
};

const AuthButton = ({ type }) => {
  const { sessionState } = useContext(SessionContext);

  const isLoggedIn = sessionState.user !== null;

  const { login, logout } = useAuth();
  const action = isLoggedIn ? logout : login;
  const label = isLoggedIn ? "Sign out" : "Sign in with Google";

  return (
    <button onClick={action} className={styles[type]}>
      {!isLoggedIn && <img src="/web_light_rd_ctn.svg" />}
      {isLoggedIn && label}
    </button>
  );
};

export default AuthButton;
