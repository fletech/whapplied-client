import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiStackFill } from "react-icons/ri";
import AuthButton from "./AuthButton";
import { SessionContext } from "../context/sessionContext";

const Sidebar = ({ setTrigger }) => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  return (
    <aside className="Layout-sidebar w-[200px] h-[full] border-r border-r-dark-gray ">
      <div className="sticky pt-[14vh] h-[100vh] w-[80%] left-8 top-0 pb-10 flex flex-col justify-between items-center">
        <div className="w-full flex flex-col items-start justify-start">
          <Link
            to="/overview"
            className="hover:text-custom-blue text-soft-black flex items-center  w-full"
          >
            <RiStackFill />
            <p className="ml-2">Overview</p>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center w-full justify-center mb-4">
            <img
              src={user?.avatarUrl}
              alt="User Avatar"
              className="rounded-full w-8 h-8"
            />
            <p
              className="ml-2 text-xs font-bold"
              onClick={() => setTrigger(true)}
            >
              {user?.name}
            </p>
          </div>
          <AuthButton type="small" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
