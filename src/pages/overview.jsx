import React, { useContext, useState } from "react";
import Dashboard from "../components/Dashboard";
import { SessionContext } from "../context/sessionContext";
import Heading from "../components/Heading";
import DefaultHeading from "../components/DefaultHeading";
// const Dashboard = React.lazy(() => import('../components/Dashboard'));

const OverviewPage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;

  if (!user) {
    return <DefaultHeading />;
  }
  return (
    <article className="OverviewPage">
      <section className="flex">
        <Dashboard />
      </section>
    </article>
  );
};

export default OverviewPage;
