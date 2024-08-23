import React, { useContext } from "react";
import { TableContext } from "../context/tableContext";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaArrowUpShortWide } from "react-icons/fa6";

const TableHeaders = () => {
  const { tableData, sortDirection, toggleSort, sortColumn } =
    useContext(TableContext);

  return tableData.filteredHeaders?.map((header: any, cellIndex: number) => {
    const tooltip =
      sortDirection === "asc" ? "Sort Descending" : "Sort Ascending";
    return (
      <th
        className={` relative px-4 py-4 z-20 font-extrabold text-sm text-soft-black text-left `}
        key={cellIndex}
      >
        <div
          className="flex items-center gap-2 relative group cursor-pointer"
          onClick={() => toggleSort(header.key)}
        >
          {header.title}
          <button className="p-2">
            {sortDirection === "asc" && header.key === sortColumn ? (
              <FaArrowDownShortWide />
            ) : (
              <FaArrowUpShortWide />
            )}
          </button>
          {/* <span className="absolute -top-4  transform  bg-soft-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {tooltip}
          </span> */}
        </div>
      </th>
    );
  });
};

export default TableHeaders;
