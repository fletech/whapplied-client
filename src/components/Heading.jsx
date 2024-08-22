import React from "react";
import DefaultHeading from "./DefaultHeading";

const Heading = ({ user }) => {
  if (!user) {
    // return <DefaultHeading />;
    return null;
  }
  return (
    <div className="flex items-center gap-4">
      <img
        src={user.avatarUrl}
        alt="User Avatar"
        className=" rounded-full size-12"
      />
      <div className="Heading flex flex-col items-center">
        <h1 className="text-xl font-bold">Welcome, {user.name}!</h1>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default Heading;
