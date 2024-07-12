import React, { useContext } from "react";
import { TableContext } from "../context/tableContext";
import useData from "../hooks/useData";
import useModal from "../hooks/useModal";

const TableRowDetails = () => {
  const { rowClicked, rowData, modalState } = useContext(TableContext);
  const { deleteRow } = useData();
  // const { closeModal } = useModal();
  return (
    modalState.trigger && (
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-xl font-bold mt-4">{rowData.shownContent.company}</p>
        <p className="text-sm text-gray-500">{rowData.shownContent.position}</p>
        <p className="text-sm text-gray-500">{rowData.shownContent.location}</p>

        <p className="text-sm text-gray-500">{rowData.shownContent.status}</p>
        <button
          className="bg-crimson text-white px-4 py-2 rounded-lg mt-4 w-1/3 font-semibold"
          // onClick={async () => deleteRow(rowClicked).then(() => closeModal())}
          onClick={async () => deleteRow(rowClicked)}
        >
          Delete
        </button>
      </div>
    )
  );
};

export default TableRowDetails;
