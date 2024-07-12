import React, { useContext } from "react";
import { TableContext } from "../context/tableContext";

const TableHeaders = () => {
  const { tableData } = useContext(TableContext);
  return tableData.filteredHeaders?.map((header: string, cellIndex: number) => {
    return (
      <th className="px-4 py-4 text-left z-20" key={cellIndex}>
        {header}
      </th>
    );
  });
};

export default TableHeaders;
