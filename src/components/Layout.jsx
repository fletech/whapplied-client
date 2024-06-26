import React from "react";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="layout flex flex-col min-h-[100vh] w-full px-8">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
