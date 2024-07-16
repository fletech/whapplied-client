import React, { useContext } from "react";
import AuthButton from "./AuthButton";
import { Link } from "react-router-dom";
import { TableContext } from "../context/tableContext";
import { MdDeleteForever } from "react-icons/md";
import ManySelectedButton from "./ManySelectedButton";

// import { SessionContext } from "../context/sessionContext";

const Header = ({ height }) => {
  // const { sessionState } = useContext(SessionContext);
  const { manyRowsClicked } = useContext(TableContext);

  return (
    <header
      className={`Header w-full flex justify-between items-center ${height} fixed top-0 left-0 w-screen px-8 border-b border-b-dark-gray bg-white z-10`}
    >
      <div className="w-auto h-auto flex">
        <Link to="/" className="flex items-center">
          <img src="/llogo.svg" alt="logo" className="w-[200px] h-full" />
        </Link>
        <ManySelectedButton />
        {/* {manyRowsClicked.length > 0 && (
          <div className="ml-8 flex items-center ">
            <p className="text-sm font-bold">
              {manyRowsClicked.length > 0 &&
                `${manyRowsClicked.length} items selected`}
            </p>
            <button className="ml-6 bg-crimson text-white flex items-center rounded-lg border px-3 py-2">
              <div className="mb-[0.3px]">
                <MdDeleteForever />
              </div>
              <p className="ml-2 font-semibold">Delete</p>
            </button>
          </div>
        )} */}
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
