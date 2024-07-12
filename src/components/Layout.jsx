import React, { useContext, useState } from "react";

import Header from "./Header";
import { SessionContext } from "../context/sessionContext";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";
import Modal from "./Modal";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const isLogged = user !== null;
  const [trigger, setTrigger] = useState(false);

  const headerHeight = "10vh";
  return (
    <div className="layout flex flex-col min-h-[100vh] w-full px-8">
      <Header height={`h-[10vh]`} />
      <article className="Layout-content flex min-h-[100vh] h-full">
        {isLogged && <Sidebar setTrigger={setTrigger} />}
        <div
          className={`w-full  h-auto min-h-[90vh] mt-[10vh] p-6 flex flex-col items-center justify-center `}
        >
          {children}
        </div>
        <Modal trigger={trigger} onClose={() => setTrigger(false)}>
          {trigger && (
            <div className="flex flex-col items-center justify-center w-full">
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="rounded-full w-20 h-20"
              />
              <p className="text-xl font-bold mt-4">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          )}
        </Modal>
      </article>
    </div>
  );
};

export default Layout;
