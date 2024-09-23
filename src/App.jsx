import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { SessionProvider } from "./context/sessionContext";
import Home from "./components/Home.jsx";
import OverviewPage from "./pages/overview.jsx";
import HomePage from "./pages/home.jsx";
import { TableProvider } from "./context/tableContext.jsx";
import ArchivedPage from "./pages/archived.jsx";
import ActivePage from "./pages/active.jsx";
import RejectedPage from "./pages/rejected.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import getGoogleOAuthUrl from "./utils/getGoogleUrl.ts";

function App() {
  return (
    <Router>
      <SessionProvider>
        <TableProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/overview"
                element={
                  // <AuthGuard>
                  <OverviewPage />
                  // </AuthGuard>
                }
              />
              <Route
                path="/archived"
                element={
                  // <AuthGuard>
                  <ArchivedPage />
                  // </AuthGuard>
                }
              />
              <Route
                path="/rejected"
                element={
                  // <AuthGuard>
                  <RejectedPage />
                  // </AuthGuard>
                }
              />
              <Route
                path="/active"
                element={
                  // <AuthGuard>
                  <ActivePage />
                  // </AuthGuard>
                }
              />
            </Routes>
          </Layout>
        </TableProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;
