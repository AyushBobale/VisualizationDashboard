import "./Navbar.css";

import React from "react";
import { Tooltip } from "react-tooltip";
import { redrawCharts } from "../../redux/slices/dataSlice";
import { useDispatch } from "react-redux";

function Navbar({ sideBar, toggleSideBar }) {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="navbar-inner elivate-shadow">
        <div className="nav-inner-left">
          <h3
            id="sidebar-h"
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
            id="redraw-p"
            onClick={() => {
              dispatch(redrawCharts());
            }}
          >
            Redraw charts
          </p>
          <Tooltip anchorSelect="#redraw-p" className="dark">
            This is if the charts don't render properly after screen size change
          </Tooltip>

          <Tooltip anchorSelect="#sidebar-h" className="dark">
            I open close the sidebar
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
