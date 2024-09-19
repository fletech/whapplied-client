import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { SessionContext } from "../context/sessionContext";
import { MdLogout } from "react-icons/md";
import { AuthService } from "../services/authService";

const styles = {
  small: "text-xs text-gray-500",
  medium: "text-sm",
};

const AuthButton = ({ type }) => {
  const { login, logout, user } = useAuth();
  const authService = new AuthService();

  const isLoggedIn = user !== null;

  const action = isLoggedIn ? logout : login;
  const label = isLoggedIn ? "Sign out" : "Sign in with Google";

  if (!isLoggedIn) {
    return (
      <a href={authService.login()} className={styles[type]}>
        <img src="/web_light_sq_ctn.svg" />
      </a>
    );
  }

  return (
    <a href={authService.logout()} className={styles[type]}>
      {isLoggedIn && (
        <span className="flex items-center">
          <MdLogout />
          <p className="ml-2">{label}</p>
        </span>
      )}
    </a>
  );
};

export default AuthButton;
