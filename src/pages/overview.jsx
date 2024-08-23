import React, { useContext, useEffect, useState } from "react";
import TableContainer from "../components/TableContainer";
import { SessionContext } from "../context/sessionContext";

import DefaultHeading from "../components/DefaultHeading";

import { TableContext } from "../context/tableContext";

const OverviewPage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { setPageFilter } = useContext(TableContext);

  useEffect(() => {
    setPageFilter("overview");
  }, []);
  // const [triggerNewRow, setTriggerNewRow] = useState(false);
  if (!user) {
    return <DefaultHeading />;
  }

  return (
    <article className="OverviewPage w-full h-full ">
      <section className="flex flex-col mb-8 items-center justify-start w-full h-full ">
        <TableContainer />
      </section>
    </article>
  );
};

export default OverviewPage;
