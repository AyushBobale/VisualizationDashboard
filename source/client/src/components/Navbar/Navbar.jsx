import "./Navbar.css";

import React from "react";

function Navbar({ sideBar, toggleSideBar }) {
  return (
    <div className="navbar">
      <div className="navbar-inner elivate-shadow">
        {" "}
        <p
          onClick={() => {
            toggleSideBar(!sideBar);
          }}
        >
          Sidebar
        </p>{" "}
        Header
      </div>
    </div>
  );
}

export default Navbar;
