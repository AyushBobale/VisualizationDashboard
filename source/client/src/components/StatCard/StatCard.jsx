import React, { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const StatCard = ({ attribute }) => {
  const statDetails = useSelector(
    (state) => state.rootReducer?.data?.data?.statDetails
  );

  // const getHighestKeys = () => {
  //   const formatted = {};
  //   for (const detail of statDetails) {
  //   }
  //   console.log(formatted);
  //   return formatted;
  // };

  // getHighestKeys();

  return (
    <div className="stat chart-container elivate-shadow">
      StatCard
      <div className="stats-inner-container">
        <div>
          <span>Country </span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
