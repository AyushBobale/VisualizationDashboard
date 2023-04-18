import { Outlet } from "react-router";
import React from "react";

function RootLayout() {
  return (
    <div className="root-cont">
      RootLayout
      <Outlet />
    </div>
  );
}

export default RootLayout;
