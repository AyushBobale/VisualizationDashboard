import "./Sidebar.css";

import { Link } from "react-router-dom";
import { ROUTES } from "../../config";
import React from "react";

function Sidebar({ sideBar, setSideBar }) {
  return (
    <div className={sideBar ? "sidebar" : "sidebar-closed"}>
      <div>
        <Link to={ROUTES.ROOT}>Home</Link>
      </div>
      <div>
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      </div>
    </div>
  );
}

export default Sidebar;
