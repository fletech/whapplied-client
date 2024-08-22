import React, { useContext, useEffect, useState } from "react";
import TableContainer from "../components/TableContainer";
import { SessionContext } from "../context/sessionContext";
import Heading from "../components/Heading";
import DefaultHeading from "../components/DefaultHeading";
import Modal from "../components/Modal";
import RowForm from "../components/RowForm";
import useData from "../hooks/useData";
import { TableContext } from "../context/tableContext";
// const Dashboard = React.lazy(() => import('../components/TableContainer'));

const ArchivedPage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { setPageFilter } = useContext(TableContext);

  useEffect(() => {
    setPageFilter("archived");
  }, []);

  // const [triggerNewRow, setTriggerNewRow] = useState(false);
  if (!user) {
    return <DefaultHeading />;
  }
  return (
    <article className="OverviewPage w-full h-full ">
      <section className="flex flex-col mb-8 items-center justify-start w-full h-full ">
        <TableContainer filter={"archived"} />
      </section>
    </article>
  );
};

export default ArchivedPage;
