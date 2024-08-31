import React, { useEffect, useContext } from "react";
import TableContainer from "../components/TableContainer";
import { TableContext } from "../context/tableContext";

const OverviewPage = () => {
  const { setPageFilter } = useContext(TableContext);

  useEffect(() => {
    setPageFilter("overview");
  }, [setPageFilter]);

  return (
    <article className="OverviewPage w-full h-full">
      <section className="flex flex-col mb-8 items-center justify-start w-full h-full">
        <TableContainer />
      </section>
    </article>
  );
};

export default OverviewPage;
