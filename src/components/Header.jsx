import React, { useContext } from "react";
import AuthButton from "./AuthButton";
import { Link } from "react-router-dom";

// import { SessionContext } from "../context/sessionContext";

const Header = ({ height }) => {
  // const { sessionState } = useContext(SessionContext);

  return (
    <header
      className={`Header w-full flex justify-between items-center ${height} fixed top-0 left-0 w-screen px-8 border-b border-b-dark-gray bg-white z-10`}
    >
      <div className="w-auto h-auto">
        <Link to="/" className="flex items-center">
          <img src="/logo-3.svg" alt="logo" className="w-[200px] h-full" />
        </Link>
      </div>
      <div className="flex items-center justify-between py-3">
        <div className="hidden lg:flex items-center">
          <AuthButton />
        </div>
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
