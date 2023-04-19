import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config";
import React from "react";

function Sidebar({ sideBar, setSideBar }) {
  return (
    <div className={sideBar ? "sidebar" : "sidebar-closed"}>
      <div className="elivate-shadow">
        <NavLink to={ROUTES.ROOT}>Home</NavLink>
      </div>
      <div className="elivate-shadow">
        <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
