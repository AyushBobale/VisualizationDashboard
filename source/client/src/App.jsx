import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import { Home } from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { ROUTES } from "./config";
import React from "react";
import RootLayout from "./Layouts/RootLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ROUTES.ROOT} element={<RootLayout />}>
            <Route path={ROUTES.ROOT} element={<Home />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
