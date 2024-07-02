import React, { useContext } from "react";
import { SessionContext } from "../context/sessionContext";
import Home from "../components/Home";
import Heading from "../components/Heading";

const HomePage = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  return (
    <section className="HomePage flex flex-col items-center justify-center h-full">
      <Heading user={user} />
      {!user && <Home />}
    </section>
  );
};

export default HomePage;
