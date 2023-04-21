import React, { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";

function RootLayout() {
  const [sideBar, setSideBar] = useState(false);
  return (
    <div className="root-container">
      <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
      <div className="nav-outlet-container">
        <Navbar sideBar={sideBar} toggleSideBar={setSideBar} />
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
