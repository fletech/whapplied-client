import React, { useContext, useState } from "react";

import Header from "./Header";
import { SessionContext } from "../context/sessionContext";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import useModal from "../hooks/useModal";
import { TableContext } from "../context/tableContext";
import RowForm from "./RowForm";
import TableRowDetails from "./TableRowDetails";

const Layout = ({ children }) => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const isLogged = user !== null;
  const [trigger, setTrigger] = useState(false);
  const { closeModal } = useModal();
  const { modalState } = useContext(TableContext);

  const headerHeight = "10vh";
  return (
    <main className="layout flex flex-col min-h-[100vh] w-full px-8 ">
      <Header height={`h-[10vh]`} />
      <article className="Layout-content flex min-h-[100vh] h-full">
        {isLogged && <Sidebar setTrigger={setTrigger} />}
        <div
          className={`w-full  h-auto min-h-[90vh] mt-[10vh] p-6 flex flex-col items-center justify-center `}
        >
          {children}
        </div>

        <Modal trigger={modalState.trigger} onClose={() => closeModal()}>
          {modalState.children}
        </Modal>
      </article>
    </main>
  );
};

export default Layout;
