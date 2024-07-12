import { useEffect, useState, useContext } from "react";

import { SessionContext } from "../context/sessionContext";
import Modal from "./Modal";
import { dumbData } from "../lib/dumbData";
import DashboardTable from "./DashboardTable";

import TableRowDetails from "./TableRowDetails";
import RowForm from "./RowForm";
import { TableContext } from "../context/tableContext";
import useModal from "../hooks/useModal";

const Dashboard = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { modalState, setModalState } = useContext(TableContext);
  const { closeModal } = useModal();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">No user</div>
    );
  }

  return (
    <section className="Dashboard w-full">
      <div className="max-w-screen  flex flex-col h-full w-full ">
        <div className="mb-8 w-full flex items-center justify-start">
          <button
            className="rounded-lg bg-custom-blue px-4 py-2 w-auto h-auto text-white font-semibold flex items-center justify-center"
            onClick={() =>
              setModalState({
                type: "newRow",
                trigger: true,
              })
            }
          >
            <span className="mr-2 rounded-full bg-white-smoke text-custom-blue w-4 h-4 flex items-center justify-center pb-[1px] font-extrabold outline-2">
              +
            </span>{" "}
            Add New
          </button>
        </div>
        <DashboardTable />
        <Modal trigger={modalState.trigger} onClose={() => closeModal()}>
          {modalState.type == "details" && <TableRowDetails />}
          {modalState.type == "newRow" && <RowForm type="new" />}
        </Modal>
      </div>
    </section>
  );
};

export default Dashboard;
