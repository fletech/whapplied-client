import React, { useContext, useState } from "react";
import { TableContext } from "../context/tableContext";
import { BiSolidArchive } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import useData from "../hooks/useData";
import useModal from "../hooks/useModal";
import RowForm from "./RowForm";

const TableRowDetails = () => {
  const { rowClicked, rowData, modalState } = useContext(TableContext);
  const [edit, setEdit] = useState(true);
  const { deleteRow, archiveRow } = useData();
  // const { closeModal } = useModal();

  return (
    modalState.trigger && (
      <div className="flex flex-col items-start justify-center w-full">
        {edit && (
          <>
            <div className="w-full mb-4 flex gap-2">
              <button
                className="hover:text-indian-red px-1 py-1 rounded-lg hover:border-indian-red border-2 border-white hover:shadow-sm mt-4 w-auto font-semibold flex items-center"
                // onClick={async () => deleteRow(rowClicked).then(() => closeModal())}
                onClick={async () => deleteRow(rowClicked)}
              >
                <MdDeleteForever className="mb-[1px]  text-2xl" />
              </button>
              <button
                className="hover:text-green px-1 py-1 rounded-lg hover:border-green border-2 border-white hover:shadow-sm mt-4 w-auto font-semibold flex items-center"
                // onClick={async () => deleteRow(rowClicked).then(() => closeModal())}
                onClick={async () => archiveRow(rowClicked)}
              >
                <BiSolidArchive className="text-xl" />
              </button>
            </div>
            <RowForm edit={true} />
          </>
        )}
      </div>
    )
  );
};

export default TableRowDetails;
