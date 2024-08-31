import React, { useContext, useEffect, useState } from "react";
import TableContainer from "../components/TableContainer";

import { TableContext } from "../context/tableContext";
// const Dashboard = React.lazy(() => import('../components/Dashboard'));

const ActivePage = () => {
  const { setPageFilter } = useContext(TableContext);

  useEffect(() => {
    setPageFilter("active");
  }, []);

  return (
    <article className="OverviewPage w-full h-full ">
      <section className="flex flex-col mb-8 items-center justify-start w-full h-full ">
        <TableContainer filter={"rejected"} />
      </section>
    </article>
  );
};

export default ActivePage;
