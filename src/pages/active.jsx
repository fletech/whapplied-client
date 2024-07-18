import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { SessionContext } from "../context/sessionContext";
import Heading from "../components/Heading";
import DefaultHeading from "../components/DefaultHeading";
import Modal from "../components/Modal";
import RowForm from "../components/RowForm";
import useData from "../hooks/useData";
import { TableContext } from "../context/tableContext";
// const Dashboard = React.lazy(() => import('../components/Dashboard'));

const ActivePage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { setPageFilter } = useContext(TableContext);
  const { getSpreadsheetData } = useData();

  useEffect(() => {
    setPageFilter("active");
    getSpreadsheetData();
  }, []);

  // const [triggerNewRow, setTriggerNewRow] = useState(false);
  if (!user) {
    return <DefaultHeading />;
  }
  return (
    <article className="OverviewPage w-full h-full ">
      <section className="flex flex-col mb-8 items-center justify-start w-full h-full ">
        <Dashboard filter={"rejected"} />
      </section>
    </article>
  );
};

export default ActivePage;
