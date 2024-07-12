import React from "react";
import AuthButton from "./AuthButton";

const DefaultHeading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p>You must be logged in to see this page.</p>
      <AuthButton />
    </div>
  );
};

export default DefaultHeading;
