import "./StatCard.css";

import React, { useEffect, useState } from "react";

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
    formatted["region"] = statDetails?.["region"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );
    formatted["country"] = statDetails?.["country"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );
    formatted["source"] = statDetails?.["source"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );
    formatted["pestle"] = statDetails?.["pestle"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );
    formatted["pestle"] = statDetails?.["pestle"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );
    formatted["sector"] = statDetails?.["sector"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );
    formatted["topic"] = statDetails?.["topic"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );
    formatted["start_year"] = statDetails?.["start_year"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );
    formatted["end_year"] = statDetails?.["end_year"]?.reduce((max, obj) =>
      max?.[searchParams.get("summaryOf")] >
        obj?.[searchParams.get("summaryOf")] &&
      !!max?._id &&
      !!obj?._id
        ? max
        : obj
    );

    return formatted;
  };

  useEffect(() => {
    setHighestKeys(getHighestKeys());
  }, [searchParams, statDetails]);

  return (
    <div className="stat chart-container elivate-shadow">
      Highest {searchParams.get("summaryOf")}
      <div className="stats-inner-container">
        <div>
          <span>Region : </span> <span>{highestKeys?.region?._id}</span>
          <span>{highestKeys?.region?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Country : </span> <span>{highestKeys?.country?._id}</span>
          <span>{highestKeys?.country?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Source : </span> <span>{highestKeys?.source?._id}</span>
          <span>{highestKeys?.source?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Pestle : </span> <span>{highestKeys?.pestle?._id}</span>
          <span>{highestKeys?.pestle?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Sector : </span> <span>{highestKeys?.sector?._id}</span>
          <span>{highestKeys?.sector?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Topic : </span> <span>{highestKeys?.topic?._id}</span>
          <span>{highestKeys?.topic?.[searchParams.get("summaryOf")]}</span>
        </div>
        <div>
          <span>Start Year : </span> <span>{highestKeys?.start_year?._id}</span>
          <span>
            {highestKeys?.start_year?.[searchParams.get("summaryOf")]}
          </span>
        </div>
        <div>
          <span>End Year : </span> <span>{highestKeys?.end_year?._id}</span>
          <span>{highestKeys?.end_year?.[searchParams.get("summaryOf")]}</span>
        </div>
      </div>
    </div>
  );
};
