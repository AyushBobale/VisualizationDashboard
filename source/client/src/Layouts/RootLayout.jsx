import React, { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";

function RootLayout() {
  const [sideBar, setSideBar] = useState(true);
  return (
    <div className="root-container">
      <Sidebar />
      <div className="nav-outlet-container">
        <Navbar />
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
