import "./ToggleButton.css";

import React from "react";

const ToggleButton = ({ label, isActive, text, toggle }) => {
  return (
    <>
      {text}
      <div className="toggle-switch">
        <input
          type="checkbox"
          name={label}
          id={label}
          className="checkbox"
          checked={isActive ? "true" : "false"}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span
            className="switch"
            onClick={() => {
              toggle(!isActive);
            }}
          />
        </label>
      </div>
    </>
  );
};

export default ToggleButton;
