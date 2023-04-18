import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

function RootLayout() {
  return (
    <div className="root-cont">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default RootLayout;
