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
      <div className="flex justify-center items-center h-full w-full">
        Loading
      </div>
    );
  }

  return (
    <section className="w-auto h-auto z-100 relative ">
      <table
        className={`table-auto text-soft-black w-full border-collapse relative bg-white ${
          rowClicked !== "" ? "pointer-events-none" : ""
        }`}
      >
        <thead className="sticky top-[10vh] rounded-xl bg-light-gray z-10 opacity-95 ">
          <tr>
            <th className="py-2 px-4 w-10">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleSelectAll}
                className="w-4 h-4"
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
