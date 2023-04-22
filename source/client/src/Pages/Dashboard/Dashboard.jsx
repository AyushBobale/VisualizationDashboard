import "./Dashboard.css";
import "../../components/FilterTabs/FilterTab.css";

import React, { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import {
  getAllDataThunk,
  getAllDistinctDataThunk,
  getAllSortedDataThunk,
  getStatDetailsThunk,
} from "../../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "../../components/BarChart/BarChart";
import BarChartMultiple from "../../components/BarChart/BarChartMultiple";
import DoughnutChart from "../../components/RadarChart/RadarChart";
import Dropdown from "../../components/Dropdown/Dropdown";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import LineChart from "../../components/LineChart/LineChart";
import LineChartMultiple from "../../components/LineChart/LineChartMultiple";
import { StatCard } from "../../components/StatCard/StatCard";
import { Tooltip } from "react-tooltip";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";

function Dashboard(props) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const responsiveWindow = useResponsiveWindow();
  const distinct = useSelector(
    (state) => state.rootReducer?.data?.data?.distinct
  );
  const statDetails = useSelector(
    (state) => state.rootReducer?.data?.data?.statDetails
  );

  const options = [
    {
      value: "Start year",
      key: "start_year",
    },
    {
      value: "End year",
      key: "end_year",
    },
    // {
    //   value: "Publised Date",
    //   key: "published",
    // },
    // {
    //   value: "Added Date",
    //   key: "added",
    // },
    ,
  ];

  const summarizedOptions = [
    {
      value: "Region",
      key: "region",
    },
    {
      value: "Pestle",
      key: "pestle",
    },
    {
      value: "Sector",
      key: "sector",
    },
  ];

  const attributes = [
    {
      value: "Relevance",
      key: "relevance",
      borderColor: "rgba(255, 99, 132, 0.8)",
      backGroundColor: "rgba(255, 99, 132, 0.1)",
    },
    {
      value: "Intensity",
      key: "intensity",
      borderColor: "rgba(54, 162, 235, 0.8)",
      backGroundColor: "rgba(54, 162, 235, 0.1)",
    },
    {
      value: "Impact",
      key: "impact",
      borderColor: "rgba(255, 206, 86, 0.8)",
      backGroundColor: "rgba(255, 206, 86, 0.1)",
    },
    {
      value: "Likelihood",
      key: "likelihood",
      borderColor: "rgba(75, 192, 192, 0.8)",
      backGroundColor: "rgba(75, 192, 192, 0.1)",
    },
  ];

  //sorting params
  const [selectdSortParam, setSelectedSortParam] = useState(options[0]);
  const [selectdSummaryBy, setSelectedSummaryBy] = useState(
    summarizedOptions[0]
  );
  const [selectdSummaryOf, setSelectedSummaryOf] = useState(attributes[0]);
  const [selectdSortDirecton, setSelectedSortDirection] = useState();
  const [selectdSortFrom, setSelectedSortFrom] = useState();
  const [selectdSortTo, setSelectedSortTo] = useState();
  const [sortOptions, setSortOptions] = useState([]);

  const [selectedAttribute, setSelectedAttribute] = useState(attributes[0]);

  useEffect(() => {
    const reqData = {
      sortParam: searchParams.get("sortParam")
        ? searchParams.get("sortParam")
        : undefined,
      sortValue: searchParams.get("sortValue")
        ? searchParams.get("sortValue")
        : undefined,
      from_data: searchParams.get("from_data")
        ? searchParams.get("from_data")
        : undefined,
      to_data: searchParams.get("to_data")
        ? searchParams.get("to_data")
        : undefined,
      orAndFilter: searchParams.get("orAndFilter")
        ? searchParams.get("orAndFilter")
        : undefined,
      statFor: searchParams.get("summaryBy")
        ? searchParams.get("summaryBy")
        : undefined,

      filter: {
        country: searchParams.get("country")
          ? searchParams.get("country")
          : undefined,
        topic: searchParams.get("topic")
          ? searchParams.get("topic")
          : undefined,
        sector: searchParams.get("sector")
          ? searchParams.get("sector")
          : undefined,
        region: searchParams.get("region")
          ? searchParams.get("region")
          : undefined,
        pestle: searchParams.get("pestle")
          ? searchParams.get("pestle")
          : undefined,
        source: searchParams.get("source")
          ? searchParams.get("source")
          : undefined,
      },
    };
    dispatch(getAllDistinctDataThunk(reqData));
    dispatch(getStatDetailsThunk(reqData));
  }, [searchParams]);

  // this use effect is used to refelect the changes from link to state vars
  useEffect(() => {
    setSelectedSortFrom(searchParams.get("from_data"));
    setSelectedSortTo(searchParams.get("to_data"));
    if (searchParams.get("sortParam")) {
      setSelectedSortParam(
        options?.filter((elm) => elm.key == searchParams.get("sortParam"))?.[0]
      );
    } else {
      setSelectedSortParam(options[0]);
    }
    if (searchParams.get("summaryBy")) {
      setSelectedSummaryBy(
        summarizedOptions?.filter(
          (elm) => elm.key == searchParams.get("summaryBy")
        )?.[0]
      );
    } else {
      setSelectedSummaryBy(summarizedOptions[0]);
    }
    if (searchParams.get("summaryOf")) {
      setSelectedSummaryOf(
        attributes?.filter(
          (elm) => elm.key == searchParams.get("summaryOf")
        )?.[0]
      );
    } else {
      setSelectedSummaryOf(attributes[0]);
    }
  }, [searchParams]);

  // this useeffect is used to set the sortValue onchnage of sort Param
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params["sortValue"] = 1;
    params["summaryBy"] = selectdSummaryBy?.key;
    params["summaryOf"] = selectdSummaryOf?.key;
    setSearchParams(createSearchParams(params));
    setSelectedSortDirection(1);
    setSortOptions(distinct?.[searchParams.get("sortParam")]);
    if (!searchParams.get("sortParam")) {
      searchParams.delete("from_data");
      searchParams.delete("to_data");
      searchParams.delete("sortValue");
    }
  }, [searchParams.get("sortParam"), distinct]);

  const formatedSortParamVsDataParamSumNew = (data, sortParam, dataParam) => {
    let formatted = {};
    for (const elm of data || []) {
      formatted[elm?._id] = elm?.[dataParam];
    }
    delete formatted[""];
    delete formatted[null];
    return formatted;
  };

  const formatStatDetailsData = (data, attribute) => {
    let formatted = {};
    for (const elm of data) {
      if (elm?._id) formatted[elm?.["_id"]] = elm?.[attribute];
    }
    delete formatted[""];
    delete formatted[null];
    return formatted;
  };

  const formatedSortParamVsAllNew = (data) => {
    let formattedData = {};
    for (const elm of data || []) {
      formattedData[elm?._id] = {};
      formattedData[elm?._id]["intensity"] = elm?.["intensity"];
      formattedData[elm?._id]["relevance"] = elm?.["relevance"];
      formattedData[elm?._id]["impact"] = elm?.["impact"];
      formattedData[elm?._id]["likelihood"] = elm?.["likelihood"];
    }
    delete formattedData[""];
    delete formattedData[null];
    return formattedData;
  };

  const createOptions = (title, hideLegend, hideScales) => {
    return {
      scales: {
        y: {
          display: !hideScales,
          ticks: {
            font: {
              size: responsiveWindow?.phone ? 8 : null,
            },
          },
        },
        x: {
          display: !hideScales,
          ticks: {
            font: {
              size: responsiveWindow?.phone ? 10 : 12,
            },
          },
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: !hideLegend,
          position: "top",
          labels: {
            font: {
              size: responsiveWindow?.phone ? 10 : 12,
            },
          },
        },
        title: {
          display: true,
          text: title,
        },
      },
    };
  };

  return (
    <div className="dash-container">
      <div className="filter-tabs-root-cont">
        <div>
          <p id="search-by-drop">Search By</p>

          <Dropdown
            paramName={"sortParam"}
            options={options}
            selectedOption={selectdSortParam}
            onSelectedOptionChange={setSelectedSortParam}
          />
        </div>
        <Tooltip anchorSelect="#search-by-drop" className="dark" place="left">
          This is the primary range in which the data is searched by any of the
          properities in the dropdown
        </Tooltip>
        <div>
          <p id="search-from-drop">From</p>
          <Dropdown
            paramName={"from_data"}
            options={sortOptions}
            selectedOption={selectdSortFrom}
            onSelectedOptionChange={setSelectedSortFrom}
          />
          <Tooltip
            anchorSelect="#search-from-drop"
            className="dark"
            place="left"
          >
            If no options are visible, please select Search By Parameter.
          </Tooltip>
        </div>
        <div>
          <p id="search-from-drop">From</p>
          <Dropdown
            paramName={"to_data"}
            options={sortOptions}
            selectedOption={selectdSortTo}
            onSelectedOptionChange={setSelectedSortTo}
          />
        </div>
      </div>
      <div className="charts-grid">
        <div className="filter-tabs-root-cont dfilt">
          <div>
            <p id="summarize-for-drop">Sumarize for</p>
            <Dropdown
              paramName={"summaryBy"}
              options={summarizedOptions}
              selectedOption={selectdSummaryBy}
              onSelectedOptionChange={setSelectedSummaryBy}
            />
            <Tooltip
              anchorSelect="#summarize-for-drop"
              className="dark"
              place="left"
            >
              The below doughnut chart summarises data based on this factor.{" "}
              <br />
              For example, sector will give a summary of energy, retail, etc.
            </Tooltip>
          </div>
          <div>
            <p id="summarize-of-drop">Summary of</p>
            <Dropdown
              paramName={"summaryOf"}
              options={attributes}
              selectedOption={selectdSummaryOf}
              onSelectedOptionChange={setSelectedSummaryOf}
            />
            <Tooltip
              anchorSelect="#summarize-of-drop"
              className="dark"
              place="left"
            >
              The below doughnut chart sums data based on this factor. <br />
              For example, Intensity will give you the sum of each Sector.
            </Tooltip>
          </div>
        </div>
        <div className="charts-grid"></div>
        <div className="dou1 chart-container elivate-shadow" id="dou-chart">
          <Tooltip anchorSelect="#dou-chart" className="dark" place="top">
            Summed up attribute distribution by selecte Summary For parameter.
          </Tooltip>
          <DoughnutChart
            data={formatStatDetailsData(
              statDetails?.[selectdSummaryBy?.key] || [],
              selectdSummaryOf?.key
            )}
            options={createOptions(
              `${selectdSummaryOf?.value} Sum for each ${selectdSummaryBy?.value}`,
              true,
              true
            )}
            label={[`${selectdSummaryBy?.value} Sum`]}
            title={`${selectdSummaryOf?.value} Sum for each ${selectdSummaryBy?.value}`}
          />
        </div>
        <StatCard attribute={selectdSummaryOf} />
        <FilterTabs />

        <div className="filter-tabs-root-cont var-select">
          <div>
            <p id="att-drop"> Attribute</p>
            <Dropdown
              paramName={"attribute"}
              options={attributes}
              selectedOption={selectedAttribute}
              onSelectedOptionChange={setSelectedAttribute}
            />
          </div>
          <Tooltip anchorSelect="#att-drop" className="dark" place="left">
            Selects the attribute for the below to charts to isolate and see a
            single attribute.
          </Tooltip>
        </div>
        <div className="line1 chart-container elivate-shadow" id="single-chart">
          <LineChart
            data={formatedSortParamVsDataParamSumNew(
              statDetails?.[selectdSortParam?.key],
              selectdSortParam?.key,
              selectedAttribute?.key
            )}
            borderColor={
              attributes?.filter(
                (elm) => selectedAttribute?.key == elm.key
              )?.[0]?.borderColor
            }
            bgColor={
              attributes?.filter(
                (elm) => selectedAttribute?.key == elm.key
              )?.[0]?.backGroundColor
            }
            label={`${selectedAttribute?.value} Sum`}
            title={`${selectedAttribute?.value} Sum per year`}
            options={createOptions(`${selectedAttribute?.value} Sum per year`)}
          />
        </div>
        <div className="bar1 chart-container elivate-shadow" id="single-chart">
          <BarChart
            data={formatedSortParamVsDataParamSumNew(
              statDetails?.[selectdSortParam?.key],
              selectdSortParam?.key,
              selectedAttribute?.key
            )}
            borderColor={
              attributes?.filter(
                (elm) => selectedAttribute?.key == elm.key
              )?.[0]?.borderColor
            }
            bgColor={
              attributes?.filter(
                (elm) => selectedAttribute?.key == elm.key
              )?.[0]?.backGroundColor
            }
            label={[`${selectedAttribute?.value} Sum`]}
            title={`${selectedAttribute?.value} Sum per year`}
            options={createOptions(`${selectedAttribute?.value} Sum per year`)}
          />
        </div>
        <Tooltip anchorSelect="#single-chart" className="dark" place="left">
          Plots the chart between ranges selected above for the attribute
        </Tooltip>
        <div
          className="bar2 chart-container elivate-shadow"
          id="multiple-chart"
        >
          <BarChartMultiple
            data={formatedSortParamVsAllNew(
              statDetails?.[selectdSortParam?.key]
            )}
            keys={attributes}
            borderColor={[]}
            bgColor={[]}
            label={[`${"temp"} Sum`]}
            title={`Combined Sum per year`}
            options={createOptions(`Combined Sum per year`)}
          />
        </div>
        <div
          className="line2 chart-container elivate-shadow"
          id="multiple-chart"
        >
          <LineChartMultiple
            data={formatedSortParamVsAllNew(
              statDetails?.[selectdSortParam?.key]
            )}
            keys={attributes}
            borderColor={[]}
            bgColor={[]}
            label={[`Combined Sum`]}
            title={`Combined Sum per year`}
            options={createOptions(`Combined Sum per year`)}
          />
        </div>
        <Tooltip anchorSelect="#multiple-chart" className="dark" place="top">
          Plots the chart between ranges selected above for all attributes.
        </Tooltip>
      </div>
    </div>
  );
}

export default Dashboard;
