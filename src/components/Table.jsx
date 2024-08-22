import React, { useContext, useEffect, useState } from "react";
import TableRows from "./TableRows";
import TableHeaders from "./TableHeaders";
import { TableContext } from "../context/tableContext";

const Table = () => {
  const {
    error,
    loading,
    rowClicked,
    tableData,
    pageFilter,
    manyRowsClicked,
    setManyRowsClicked,
  } = useContext(TableContext);

  const ids =
    pageFilter === "overview"
      ? tableData.sortedData?.map((item) => item.hiddenContent.id)
      : tableData.filteredData?.map((item) => item.hiddenContent.id);

  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    setAllChecked(ids?.length > 0 && manyRowsClicked?.length === ids?.length);
  }, [manyRowsClicked, ids]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setManyRowsClicked(ids || []);
    } else {
      setManyRowsClicked([]);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">{error}</div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full gap-4">
        <span className=" animate-ping size-2 rounded-full bg-custom-blue"></span>
        Loading
      </div>
    );
  }

  return (
    <section className="w-auto h-auto z-100 relative ">
      <table
        className={`table-fixed text-soft-black w-full border-collapse relative bg-white ${
          rowClicked !== "" ? "pointer-events-none" : ""
        }`}
      >
        <thead className="sticky top-[10vh] rounded-xl bg-light-gray z-10 opacity-95  w-full">
          <tr>
            <th className="py-2 px-4 w-8">
              <input
                name="checkbox"
                type="checkbox"
                checked={allChecked}
                onChange={handleSelectAll}
                className="w-5 h-5 mt-1"
              />
            </th>
            <TableHeaders />
          </tr>
        </thead>
        <tbody className="w-full relative">
          <TableRows />
        </tbody>
      </table>
    </section>
  );
};

export default React.memo(Table);
