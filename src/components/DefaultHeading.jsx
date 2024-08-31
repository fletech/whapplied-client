import React, { useContext } from "react";
import AuthButton from "./AuthButton";
import { TableContext } from "../context/tableContext";
import { SessionContext } from "../context/sessionContext";

const DefaultHeading = () => {
  const { loading } = useContext(TableContext);
  const { user } = useContext(SessionContext);

  if (!loading && !user) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p>You must be logged in to see this page.</p>
        <AuthButton />
      </div>
    );
  }
};

export default DefaultHeading;
