import React, { useContext, useEffect, useState } from "react";

import useData from "../hooks/useData";

import TableRows from "./TableRows";
import TableHeaders from "./TableHeaders";
import { TableContext } from "../context/tableContext";
import { SessionContext } from "../context/sessionContext";

const DashboardTable = () => {
  const { error, loading, rowClicked } = useContext(TableContext);

  console.log("DashboardTable rendered");

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
    <table
      className={`pr-8 table-auto text-soft-black w-full rounded-sm border-collapse relative ${
        rowClicked !== "" ? "pointer-events-none" : ""
      }`}
    >
      <thead className=" sticky top-[10vh]  rounded-xl bg-light-gray z-10 opacity-90  border-b border-dark-cyan">
        <tr className="relative">{<TableHeaders />}</tr>
      </thead>
      <tbody className="w-full relative">{<TableRows />}</tbody>
    </table>
  );
};
export default React.memo(DashboardTable);
