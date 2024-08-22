import React, { useContext, useState } from "react";
import { TableContext } from "../context/tableContext";
import { BiSolidArchive } from "react-icons/bi";
import { MdOutlineArchive } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import useData from "../hooks/useData";
import RowForm from "./RowForm";
import ActionButton from "./ActionButton";

const TableRowDetails = () => {
  const { rowClicked, rowData, modalState } = useContext(TableContext);
  const [edit, setEdit] = useState(true);
  const { deleteRow, archiveRow } = useData();
  const [showHistoryLogs, setShowHistoryLogs] = useState(false);

  return (
    modalState.trigger && (
      <div className="flex flex-col items-start justify-center w-full">
        {edit && (
          <div className=" w-full h-full">
            <div className="w-full mb-4 flex gap-2 border-b-[2px] border-dark-gray pb-4 items-center">
              <div className="flex gap-2">
                <ActionButton
                  onClick={async () => deleteRow(rowClicked)}
                  hoverBorderColor="indian-red"
                  tooltip="Delete"
                >
                  <LuTrash2 className={`group-hover:text-indian-red text-xl`} />
                </ActionButton>
                <ActionButton
                  onClick={async () => archiveRow(rowClicked)}
                  hoverBorderColor="green"
                  tooltip="Archive"
                >
                  <MdOutlineArchive
                    className={`group-hover:text-green text-xl`}
                  />
                </ActionButton>
                <ActionButton
                  onClick={async () => setShowHistoryLogs(!showHistoryLogs)}
                  hoverBorderColor="custom-blue"
                  tooltip="Show history"
                >
                  <MdOutlineHistory
                    className={`group-hover:text-custom-blue text-xl`}
                  />
                </ActionButton>
              </div>
            </div>
            <RowForm edit={edit} hideActivityContent={setShowHistoryLogs} />
            {showHistoryLogs && (
              <div className="w-full flex flex-col items-start justify-between gap-2 pt-4 border-t-[2px] border-dark-gray mt-6 ">
                <h3 className="font-semibold">Activity history</h3>
                {JSON.parse(rowData.hiddenContent?.logs || "[]").map(
                  (log, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-between gap-2 mb-4 "
                    >
                      <div className="w-full text-soft-black  flex flex-col ">
                        <div className="text-dim-gray">
                          <div className=" text-soft-black flex gap-1 ">
                            <small className="capitalize flex items-center gap-2">
                              <small className="capitalize font-bold">-</small>
                              {new Date(log.timestamp).toLocaleString()}:
                            </small>
                            <small className="capitalize">
                              {!log.diffValues && (
                                <span className="capitalize ml-1 text-soft-black font-semibold">
                                  {log.action}
                                </span>
                              )}
                            </small>
                          </div>
                        </div>
                        {log.diffValues && (
                          <div className="text-dim-gray">
                            {/* Fields: */}
                            {log.diffValues.map((field, index) => (
                              <>
                                <div className=" text-soft-black font-semibold flex gap-1 ml-2">
                                  <small className="capitalize">
                                    · {log.action}
                                  </small>
                                  <small className="capitalize">
                                    {field.field}
                                  </small>
                                </div>
                                <div className="ml-4">
                                  <small className="text-gray italic">
                                    {field.previous}
                                  </small>

                                  <span className="text-custom-blue mx-1 font-semibold">
                                    {"->"}
                                  </span>
                                  <small className="text-soft-black italic font-semibold">
                                    {field.current}
                                  </small>
                                </div>
                              </>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default TableRowDetails;
