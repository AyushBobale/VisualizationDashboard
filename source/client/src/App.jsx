import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import { ROUTES } from "./config";
import React from "react";
import RootLayout from "./Layouts/RootLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ROUTES.ROOT} element={<RootLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
