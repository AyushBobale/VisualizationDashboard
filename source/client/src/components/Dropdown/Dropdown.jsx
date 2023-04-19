import "./Dropdown.css";

import React, { useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

const Dropdown = ({
  options,
  selectedOption,
  onSelectedOptionChange,
  paramName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOptionClick = (option) => {
    const params = Object.fromEntries(searchParams);
    params[paramName] = option;
    setSearchParams(createSearchParams(params));
    onSelectedOptionChange?.(option);
    setIsOpen(false);
  };

  const handleReset = () => {
    searchParams.delete(paramName);
    setSearchParams(searchParams);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
      </div>
      {isOpen && (
        <div className="dropdown-options">
          <div
            key={"reset"}
            className="dropdown-option"
            onClick={() => handleReset()}
          >
            Reset
          </div>
          {options?.map((option) => (
            <div
              key={option}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
