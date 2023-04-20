import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config";
import React from "react";

function Sidebar({ sideBar, setSideBar }) {
  return (
    <div className={sideBar ? "sidebar" : "sidebar-closed"}>
      <NavLink className="elivate-shadow" to={ROUTES.ROOT}>
        Home
      </NavLink>

      <NavLink className="elivate-shadow" to={ROUTES.DASHBOARD}>
        Dashboard
      </NavLink>
    </div>
  );
}

export default Sidebar;
