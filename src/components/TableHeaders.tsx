import React, { useContext } from "react";
import { TableContext } from "../context/tableContext";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaArrowUpShortWide } from "react-icons/fa6";

const TableHeaders = () => {
  const { tableData, sortDirection, toggleSortDirection } =
    useContext(TableContext);
  const tooltip =
    sortDirection === "asc" ? "Sort Descending" : "Sort Ascending";
  return tableData.filteredHeaders?.map((header: string, cellIndex: number) => {
    if (header === "DATE APPLIED") {
      return (
        <th
          className={`relative px-4 py-4 z-20 font-extrabold text-sm text-soft-black text-left flex items-center gap-2 flex-nowrap w-auto`}
          key={cellIndex}
        >
          {header}

          <button onClick={toggleSortDirection} className="p-2">
            {sortDirection === "asc" ? (
              <FaArrowDownShortWide />
            ) : (
              <FaArrowUpShortWide />
            )}
          </button>
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-soft-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"></span>
        </th>
      );
    }
    return (
      <th
        className={`px-4 py-4 z-20 font-extrabold text-sm text-soft-black text-left `}
        key={cellIndex}
      >
        {header}
      </th>
    );
  });
};

export default TableHeaders;
