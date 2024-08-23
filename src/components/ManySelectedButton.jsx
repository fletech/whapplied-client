import React, { Component, useContext } from "react";
import { TableContext } from "../context/tableContext";

import { MdDeleteForever } from "react-icons/md";
import { BiSolidArchive } from "react-icons/bi";
import { MdOutlineArchive } from "react-icons/md";
import { MdOutlineUnarchive } from "react-icons/md";

import useData from "../hooks/useData";

const ManySelectedButton = () => {
  const { manyRowsClicked, setManyRowsClicked } = useContext(TableContext);
  const { archiveMultipleRows, getBulkAction } = useData();

  const { bulkAction } = getBulkAction();

  const actionContent = () => {
    return {
      archiveManyRows: {
        Icon: <MdOutlineArchive />,
        text: "Archive",
      },
      unarchiveManyRows: {
        Icon: <MdOutlineUnarchive />,
        text: "Unarchive",
      },
    };
  };

  const Icon = () => {
    const object = actionContent()[bulkAction];
    return object.Icon;
  };
  const Text = () => {
    const object = actionContent()[bulkAction];
    return <p className="ml-2 font-semibold">{object.text}</p>;
  };
  if (manyRowsClicked.length > 0)
    return (
      <>
        <div className="ml-8 flex items-center ">
          <p className="text-sm font-bold">
            {manyRowsClicked.length > 0 &&
              `${manyRowsClicked.length} items selected`}
          </p>
          <button className="ml-4 bg-indian-red hover:bg-crimson text-white flex items-center rounded-lg border px-3 py-2">
            <div className="mb-[0.3px]">
              <MdDeleteForever />
            </div>
            <p className="ml-2 font-semibold">Delete</p>
          </button>
        </div>
        <div className="ml-2 flex items-center ">
          <button
            className="ml-2 bg-sea-green hover:bg-green text-white flex items-center rounded-lg border px-3 py-2"
            onClick={() => archiveMultipleRows()}
          >
            <div className="mb-[0.3px]">
              {bulkAction === "archiveManyRows" ? (
                <MdOutlineArchive />
              ) : (
                <MdOutlineUnarchive />
              )}
            </div>
            <p className="ml-2 font-semibold">
              {bulkAction === "archiveManyRows" ? "Archive" : "Unarchive"}
            </p>
          </button>
        </div>
        <div className="ml-2 flex items-center ">
          <button
            onClick={() => setManyRowsClicked([])}
            className="ml-2 hover:text-custom-blue text-steel-blue flex items-center rounded-lg "
          >
            <p className="p-2 font-semibold">Clear</p>
          </button>
        </div>
      </>
    );
};

export default ManySelectedButton;
