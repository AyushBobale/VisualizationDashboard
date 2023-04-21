import React, { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const StatCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const statDetails = useSelector(
    (state) => state.rootReducer?.data?.data?.statDetails
  );

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

    console.log(formatted);
    return formatted;
  };

  getHighestKeys();

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
