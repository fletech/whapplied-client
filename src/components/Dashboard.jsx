import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { SessionContext } from "../context/sessionContext";
import Modal from "./Modal";
import { dumbData } from "../lib/dumbData";
import DashboardTable from "./DashboardTable";
import useData from "../hooks/useData";

const Dashboard = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const [rowClicked, setRowClicked] = useState("");
  const [rowData, setRowData] = useState("");

  const closeModal = () => {
    if (rowClicked === rowData.hiddenContent.id) {
      setRowClicked("");
      setRowData({});
      return;
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">No user</div>
    );
  }

  return (
    <section className="Dashboard">
      <div className="max-w-screen  ">
        <DashboardTable
          rowClicked={rowClicked}
          setRowClicked={setRowClicked}
          setRowData={setRowData}
        />
        <Modal data={rowData} trigger={rowClicked !== ""} onClose={closeModal}>
          {rowClicked !== "" && (
            <div className="flex flex-col items-center justify-center w-full">
              <p className="text-xl font-bold mt-4">
                {rowData.shownContent.company}
              </p>
              <p className="text-sm text-gray-500">
                {rowData.shownContent.position}
              </p>
              <p className="text-sm text-gray-500">
                {rowData.shownContent.location}
              </p>

              <p className="text-sm text-gray-500">
                {rowData.shownContent.status}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Dashboard;
