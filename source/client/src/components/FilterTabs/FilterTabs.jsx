import "./FilterTab.css";

import React, { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

import Dropdown from "../Dropdown/Dropdown";
import ToggleButton from "../ToggleButton/ToggleButton";
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
  const [andOr, setAndOr] = useState(false);

  const resetFilters = () => {
    searchParams.delete("country");
    searchParams.delete("region");
    searchParams.delete("source");
    searchParams.delete("pestle");
    searchParams.delete("sector");
    searchParams.delete("topic");
    setSearchParams(createSearchParams({}));
  };

  const handleAndOr = () => {
    setAndOr(!andOr);
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params["orAndFilter"] = !andOr ? 0 : 1;
    setSearchParams(params);
  }, [andOr]);

  useEffect(() => {
    setSelectedCountry(searchParams.get("country"));
    setSelectedRegion(searchParams.get("region"));
    setSelectedSource(searchParams.get("source"));
    setSelectedPestle(searchParams.get("pestle"));
    setSelectedSector(searchParams.get("sector"));
    setSelectedTopic(searchParams.get("topic"));
    setAndOr(parseInt(searchParams.get("orAndFilter")) ? true : false);
  }, [searchParams]);

  return (
    <div className="filt">
      <div className="filter-tabs-header">
        <h3>Filters</h3>
      </div>

      <div className="filter-tabs-root-cont">
        <div>
          <button
            className="primary-btn"
            onClick={() => {
              resetFilters();
            }}
          >
            {" "}
            Reset Filters
          </button>
        </div>
        <div>
          <button
            className="primary-btn"
            onClick={() => {
              handleAndOr();
            }}
          >
            {andOr ? "Or" : "And"} Filter Values
          </button>
        </div>
      </div>
      <div className="filter-tabs-root-cont">
        <div>
          Country
          <Dropdown
            paramName={"country"}
            options={distinct?.country}
            selectedOption={selectedCountry}
            onSelectedOptionChange={setSelectedCountry}
          />
        </div>
        <div>
          Region
          <Dropdown
            paramName={"region"}
            options={distinct?.region}
            selectedOption={selectedRegion}
            onSelectedOptionChange={setSelectedRegion}
          />
        </div>
        <div>
          Source
          <Dropdown
            paramName={"source"}
            options={distinct?.source}
            selectedOption={selectedSource}
            onSelectedOptionChange={setSelectedSource}
          />
        </div>
        <div>
          Pestle
          <Dropdown
            paramName={"pestle"}
            options={distinct?.pestle}
            selectedOption={selectedPeslte}
            onSelectedOptionChange={setSelectedPestle}
          />
        </div>
        <div>
          Sector
          <Dropdown
            paramName={"sector"}
            options={distinct?.sector}
            selectedOption={selectedSector}
            onSelectedOptionChange={setSelectedSector}
          />
        </div>
        <div>
          Topic
          <Dropdown
            paramName={"topic"}
            options={distinct?.topic}
            selectedOption={selectedTopic}
            onSelectedOptionChange={setSelectedTopic}
          />
        </div>
      </div>
    </div>
  );
};
