import React from "react";
import AuthButton from "./AuthButton";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
      <p>
        Start enjoying the benefits of gathering your Job Applications all
        together. Leave behind all those scattered, untrackable, and boring
        emails.
      </p>
      <span>Easy, sign-in with your Google account and you will see...</span>
      <AuthButton />
    </div>
  );
};

export default Home;
