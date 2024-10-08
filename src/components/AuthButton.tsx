import React, { useContext } from "react";

import { SessionContext } from "../context/sessionContext";
import { MdLogout } from "react-icons/md";
import { authService } from "../services/authService";

const styles = {
  small: "text-xs text-gray-500 hover:text-gray-700 cursor-pointer",
  medium: "text-sm hover:text-gray-700 cursor-pointer",
};

const AuthButton = ({ type }) => {
  const { sessionState } = useContext(SessionContext);
  const isLoggedIn = sessionState?.user !== null;

  const label = isLoggedIn ? "Sign out" : "Sign in with Google";

  if (!isLoggedIn) {
    return (
      <button onClick={() => authService.login()} className={styles[type]}>
        <img src="/web_light_sq_ctn.svg" />
      </button>
    );
  }

  return (
    <button onClick={() => authService.logout()} className={styles[type]}>
      {isLoggedIn && (
        <span className="flex items-center">
          <MdLogout />
          <p className="ml-2">{label}</p>
        </span>
      )}
    </button>
  );
};

export default AuthButton;
