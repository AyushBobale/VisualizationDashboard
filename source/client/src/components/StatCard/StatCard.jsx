import "./StatCard.css";

import React, { useEffect, useState } from "react";

import { Tooltip } from "react-tooltip";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const StatCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const statDetails = useSelector(
    (state) => state.rootReducer?.data?.data?.statDetails
  );
  const [highestKeys, setHighestKeys] = useState();

  const getHighestKeys = () => {
    // use search params here
    const formatted = {};
    formatted["region"] = statDetails?.["region"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );
    formatted["country"] = statDetails?.["country"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );
    formatted["source"] = statDetails?.["source"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );
    formatted["pestle"] = statDetails?.["pestle"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );
    formatted["pestle"] = statDetails?.["pestle"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );
    formatted["sector"] = statDetails?.["sector"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );
    formatted["topic"] = statDetails?.["topic"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );
    formatted["start_year"] = statDetails?.["start_year"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );
    formatted["end_year"] = statDetails?.["end_year"]?.reduce(
      (max, obj) =>
        max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")]
          ? max
          : obj,
      0
    );

    return formatted;
  };

  useEffect(() => {
    setHighestKeys(getHighestKeys());
  }, [searchParams, statDetails]);

  return (
    <div className="stat chart-container elivate-shadow" id="stat-div">
      <Tooltip anchorSelect="#stat-div" className="dark" place="top"top">
        Summed up Highest values for each attribute for the select summary of
        parameter.
      </Tooltip>
      Highest {searchParams.get("summaryOf")} {"   "}
      {!searchParams.get("summaryOf") && "Please select factor for summary of"}
      {/* <div className="stats-inner-container"> */}
      <div className="stat-table">
        <div className="stat-table-header">
          <span>Attribute </span> <span>Value</span>
          <span>{searchParams.get("summaryOf")}</span>
        </div>
        <div>
          <span>Region </span> <span>{highestKeys?.region?._id}</span>
          <span>{highestKeys?.region?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Country </span> <span>{highestKeys?.country?._id}</span>
          <span>{highestKeys?.country?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Source </span> <span>{highestKeys?.source?._id}</span>
          <span>{highestKeys?.source?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Pestle </span> <span>{highestKeys?.pestle?._id}</span>
          <span>{highestKeys?.pestle?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Sector </span> <span>{highestKeys?.sector?._id}</span>
          <span>{highestKeys?.sector?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Topic </span> <span>{highestKeys?.topic?._id}</span>
          <span>{highestKeys?.topic?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Start Year </span> <span>{highestKeys?.start_year?._id}</span>
          <span>
            {highestKeys?.start_year?.[searchParams.get("summaryOf")]}
          </span>
        </div>
        <div>
          <span>End Year </span> <span>{highestKeys?.end_year?._id}</span>
          <span>{highestKeys?.end_year?.[searchParams.get("summaryOf")]}</span>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
