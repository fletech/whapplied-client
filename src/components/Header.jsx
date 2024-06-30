import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import AuthButton from "./AuthButton";
import { SessionContext } from "../context/sessionContext";

const Header = () => {
  const { sessionState } = useContext(SessionContext);
  const isLoggedIn = sessionState.user !== null;

  return (
    <header className="Header w-full flex justify-between items-center">
      <div className="w-auto h-auto">
        <img src="/logo.svg" alt="logo" className="w-[40px] h-full" />
      </div>
      <div className="flex items-center justify-between py-3">
        <AuthButton
          isLoggedIn={isLoggedIn}
          label={isLoggedIn ? "Logout" : "Login"}
        />
        <button className="focus:outline-none lg:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
