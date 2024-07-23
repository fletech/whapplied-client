import React, { useContext, useEffect } from "react";
import { SessionContext } from "../context/sessionContext";
import Home from "../components/Home";
import Heading from "../components/Heading";
import useData from "../hooks/useData";

const HomePage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { getSpreadsheetData } = useData();

  return (
    <section className="HomePage flex flex-col items-center justify-center h-full">
      <Heading user={user} />
      {!user && <Home />}
    </section>
  );
};

export default HomePage;
