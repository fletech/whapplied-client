import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout.jsx";
import { SessionProvider } from "./context/sessionContext";
import Home from "./components/Home.jsx";

function App() {
  return (
    <SessionProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </SessionProvider>
  );
}

export default App;
