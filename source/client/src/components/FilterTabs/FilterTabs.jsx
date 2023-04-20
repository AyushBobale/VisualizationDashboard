import "./FilterTab.css";

import React, { useEffect, useState } from "react";

import Dropdown from "../Dropdown/Dropdown";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const FilterTabs = () => {
  const distinct = useSelector(
    (state) => state.rootReducer?.data?.data?.distinct
  );
  const [searchParams, setSearchParams] = useSearchParams();
  // Filter tabs
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedTopic, setSelectedTopic] = useState();
  const [selectedSector, setSelectedSector] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedPeslte, setSelectedPestle] = useState();
  const [selectedSource, setSelectedSource] = useState();

  const resetFilters = () => {
    searchParams.delete("country");
    searchParams.delete("region");
    searchParams.delete("source");
    searchParams.delete("pestle");
    searchParams.delete("sector");
    searchParams.delete("topic");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setSelectedCountry(searchParams.get("country"));
    setSelectedRegion(searchParams.get("region"));
    setSelectedSource(searchParams.get("source"));
    setSelectedPestle(searchParams.get("pestle"));
    setSelectedSector(searchParams.get("sector"));
    setSelectedTopic(searchParams.get("topic"));
  }, [searchParams]);

  return (
    <>
      <div className="filter-tabs-header">
        <h3>Filters</h3>
        <button
          className="primary-btn"
          onClick={() => {
            console.log("test");
            resetFilters();
          }}
        >
          {" "}
          Reset Filters
        </button>
      </div>

      <div className="drop-down-root-cont">
        <div className="drop-down-cont">
          Country
          <Dropdown
            paramName={"country"}
            options={distinct?.country}
            selectedOption={selectedCountry}
            onSelectedOptionChange={setSelectedCountry}
          />
        </div>
        <div className="drop-down-cont">
          Region
          <Dropdown
            paramName={"region"}
            options={distinct?.region}
            selectedOption={selectedRegion}
            onSelectedOptionChange={setSelectedRegion}
          />
        </div>
        <div className="drop-down-cont">
          Source
          <Dropdown
            paramName={"source"}
            options={distinct?.source}
            selectedOption={selectedSource}
            onSelectedOptionChange={setSelectedSource}
          />
        </div>
      </div>
      <div className="drop-down-root-cont">
        <div className="drop-down-cont">
          Pestle
          <Dropdown
            paramName={"pestle"}
            options={distinct?.pestle}
            selectedOption={selectedPeslte}
            onSelectedOptionChange={setSelectedPestle}
          />
        </div>
        <div className="drop-down-cont">
          Sector
          <Dropdown
            paramName={"sector"}
            options={distinct?.sector}
            selectedOption={selectedSector}
            onSelectedOptionChange={setSelectedSector}
          />
        </div>
        <div className="drop-down-cont">
          Topic
          <Dropdown
            paramName={"topic"}
            options={distinct?.topic}
            selectedOption={selectedTopic}
            onSelectedOptionChange={setSelectedTopic}
          />
        </div>
      </div>
    </>
  );
};
