import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { SessionProvider } from "./context/sessionContext";
import Home from "./components/Home.jsx";
import OverviewPage from "./pages/overview.jsx";
import HomePage from "./pages/home.jsx";
import { TableProvider } from "./context/tableContext.jsx";

function App() {
  return (
    <SessionProvider>
      <TableProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/overview" element={<OverviewPage />} />
            </Routes>
          </Layout>
        </Router>
      </TableProvider>
    </SessionProvider>
  );
}

export default App;
