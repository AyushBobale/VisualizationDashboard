import "./Sidebar.css";

import { Link } from "react-router-dom";
import { ROUTES } from "../../config";
import React from "react";

function Sidebar({ sideBar, setSideBar }) {
  return (
    <div className={sideBar ? "sidebar" : "sidebar-closed"}>
      <div className="elivate-shadow">
        <Link to={ROUTES.ROOT}>Home</Link>
      </div>
      <div className="elivate-shadow">
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      </div>
    </div>
  );
}

export default Sidebar;
