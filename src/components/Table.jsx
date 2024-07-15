"use server";
import React, { useContext, useEffect, useState } from "react";

import TableRows from "./TableRows";
import TableHeaders from "./TableHeaders";
import { TableContext } from "../context/tableContext";

const Table = () => {
  const { error, loading, rowClicked, tableData } = useContext(TableContext);

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
    <section className="w-auto h-auto z-100">
      <table
        className={`pr-8 table-auto text-soft-black w-full border-collapse relative bg-white ${
          rowClicked !== "" ? "pointer-events-none" : ""
        }`}
      >
        <thead className=" sticky top-[10vh]  rounded-xl bg-light-gray z-10 opacity-95 ">
          <tr className="relative">{<TableHeaders />}</tr>
        </thead>
        <tbody className="w-full relative ">{<TableRows />}</tbody>
      </table>
    </section>
  );
};
export default React.memo(Table);
