import React, { useContext } from "react";

import Header from "./Header";
import { SessionContext } from "../context/sessionContext";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

const Layout = ({ children }) => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const isLogged = user !== null;
  const headerHeight = "10vh";
  return (
    <div className="layout flex flex-col min-h-[100vh] w-full px-8">
      <Header height={`h-[10vh]`} />
      <article className="Layout-content flex min-h-[100vh] h-full">
        {isLogged && (
          <aside className="Layout-sidebar w-[200px] h-[full] border-r border-r-light-gray">
            <div className="sticky pt-[14vh] h-[100vh] w-[80%] left-8 top-0 pb-10 flex flex-col justify-between items-center">
              <Link to="/dashboard" className="text-dodger-blue ">
                Overview
              </Link>
              <div className="flex flex-col items-center">
                <div className="flex items-center w-full justify-center mb-4">
                  <img
                    src={user.avatarUrl}
                    alt="User Avatar"
                    className="rounded-full w-8 h-8"
                  />
                  <p className="ml-2 text-xs font-bold">{user.name}</p>
                </div>
                <AuthButton type="small" />
              </div>
            </div>
          </aside>
        )}
        <article
          className={`w-full  h-auto  mt-[10vh] p-6 flex flex-col items-center justify-center`}
        >
          {children}
        </article>
      </article>
    </div>
  );
};

export default Layout;
