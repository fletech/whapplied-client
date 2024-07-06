import React from "react";
import AuthButton from "./AuthButton";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home flex flex-col items-center justify-center w-full h-full">
      <p>
        Start enjoying the benefits of gathering your Job Applications all
        together. Leave behind all those scattered, untrackable, and boring
        emails.
      </p>
      <span>Easy, sign-in with your Google account and you will see...</span>
      <div className="w-auto mt-4">
        <AuthButton />
      </div>
    </div>
  );
};

export default Home;
