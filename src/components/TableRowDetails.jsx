import React, { useContext } from "react";
import { SessionContext } from "../context/sessionContext";
import axios from "axios";
import { TableContext } from "../context/tableContext";
import useData from "../hooks/useData";
import useModal from "../hooks/useModal";

const TableRowDetails = () => {
  const { sessionState } = useContext(SessionContext);
  const {
    setModalState,
    rowClicked,
    setRowClicked,
    setRowData,
    rowData,
    modalState,
  } = useContext(TableContext);
  const { setModified } = useData();
  const { closeModal } = useModal();
  const { user } = sessionState;
  return (
    modalState.trigger && (
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-xl font-bold mt-4">{rowData.shownContent.company}</p>
        <p className="text-sm text-gray-500">{rowData.shownContent.position}</p>
        <p className="text-sm text-gray-500">{rowData.shownContent.location}</p>

        <p className="text-sm text-gray-500">{rowData.shownContent.status}</p>
        <button
          className="bg-crimson text-white px-4 py-2 rounded-lg mt-4 w-1/3 font-semibold"
          onClick={async () => {
            console.log("delete");
            try {
              const response = await axios.put("/api/v1/data/delete-item", {
                accessToken: user.accessToken,
                spreadSheetId: user.spreadSheetId,
                id: rowClicked,
              });
              response && console.log("Row deleted");
              setModified(true);

              // closeModal();

              console.log("Row deleted:", response);
            } catch (err) {
              console.error("Error deleting row:", err);
              throw err;
            }
          }}
        >
          Delete
        </button>
      </div>
    )
  );
};

export default TableRowDetails;
