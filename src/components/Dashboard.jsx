import { useEffect, useState, useContext } from "react";

import { SessionContext } from "../context/sessionContext";
import Modal from "./Modal";
import Table from "./Table";

import TableRowDetails from "./TableRowDetails";
import RowForm from "./RowForm";
import { TableContext } from "../context/tableContext";
import useModal from "../hooks/useModal";
import { MdDeleteForever } from "react-icons/md";

const Dashboard = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { modalState, setModalState, pageFilter, tableData, isLoading } =
    useContext(TableContext);
  const { closeModal } = useModal();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">No user</div>
    );
  }

  return (
    <section className="Dashboard w-full ">
      <div className="max-w-screen  flex flex-col h-full w-full border-[1px] border-dark-gray py-8 rounded-xl shadow-sm bg-gainsboro">
        <div className="mb-8 w-full flex items-center justify-start px-8">
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

        <Table />
        <small className=" ml-4 mt-8 ">
          Showing{" "}
          <span>
            {isLoading
              ? null
              : pageFilter === "overview"
              ? tableData.sortedData?.length
              : tableData.filteredData?.length}{" "}
          </span>
          results
        </small>
        <Modal trigger={modalState.trigger} onClose={() => closeModal()}>
          {modalState.type == "details" && <TableRowDetails />}
          {modalState.type == "newRow" && <RowForm type="new" />}
        </Modal>
      </div>
    </section>
  );
};

export default Dashboard;
