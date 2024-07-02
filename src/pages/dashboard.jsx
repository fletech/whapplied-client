import React, { useContext, useState } from "react";
import Dashboard from "../components/Dashboard";
import { SessionContext } from "../context/sessionContext";
import Heading from "../components/Heading";
import DefaultHeading from "../components/DefaultHeading";

const DashboardPage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  if (!user) {
    return <DefaultHeading user={user} />;
  }
  return (
    <article className="DashboardPage">
      <section className="flex">
        <Dashboard />
      </section>
    </article>
  );
};

export default DashboardPage;
