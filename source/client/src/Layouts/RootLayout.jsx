import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import { toggleSideBar } from "../redux/slices/dataSlice";

function RootLayout() {
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.rootReducer.data.sideBar);
  const setSideBar = () => {
    dispatch(toggleSideBar());
  };

  return (
    <div className="root-container">
      <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
      <div className="nav-outlet-container">
        <Navbar sideBar={sideBar} toggleSideBar={setSideBar} />
        <div className="outlet-container">
          <Outlet sideBar={sideBar} />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
