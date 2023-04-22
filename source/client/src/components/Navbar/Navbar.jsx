import "./Navbar.css";

import React from "react";
import { redrawCharts } from "../../redux/slices/dataSlice";
import { useDispatch } from "react-redux";

function Navbar({ sideBar, toggleSideBar }) {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="navbar-inner elivate-shadow">
        <div className="nav-inner-left">
          <h3
            onClick={() => {
              toggleSideBar(!sideBar);
            }}
          >
            Sidebar
          </h3>
          <h3>Header</h3>
        </div>
        <div className="nav-inner-right">
          <p
            onClick={() => {
              dispatch(redrawCharts());
            }}
          >
            Redraw charts
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
