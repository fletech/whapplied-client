import React, { useContext } from "react";
import { TableContext } from "../context/tableContext";

import { MdDeleteForever } from "react-icons/md";
import { BiSolidArchive } from "react-icons/bi";
import useData from "../hooks/useData";

const ManySelectedButton = () => {
  const { manyRowsClicked, setManyRowsClicked } = useContext(TableContext);
  const { archiveMultipleRows } = useData();

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
              <BiSolidArchive />
            </div>
            <p className="ml-2 font-semibold">Archive</p>
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
