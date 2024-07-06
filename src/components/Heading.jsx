import React from "react";
import DefaultHeading from "./DefaultHeading";

const Heading = ({ user }) => {
  if (!user) {
    // return <DefaultHeading />;
    return null;
  }
  return (
    <div className="Heading">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>

      <img
        src={user.avatarUrl}
        alt="User Avatar"
        className="mt-4 rounded-full w-16 h-16"
      />
    </div>
  );
};

export default Heading;
