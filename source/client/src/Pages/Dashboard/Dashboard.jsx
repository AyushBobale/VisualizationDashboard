import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import {
  getAllDataThunk,
  getAllDistinctDataThunk,
  getAllSortedDataThunk,
} from "../../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "../../components/BarChart/BarChart";
import BarChartMultiple from "../../components/BarChart/BarChartMultiple";
import Dropdown from "../../components/Dropdown/Dropdown";
import { FilterTabs } from "../../components/FilterTabs/FilterTabs";
import LineChart from "../../components/LineChart/LineChart";
import LineChartMultiple from "../../components/LineChart/LineChartMultiple";
import PieChart from "../../components/Piechart/PieChart";
import RadarChart from "../../components/RadarChart/RadarChart";

function Dashboard() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useSelector((state) => state.rootReducer?.data?.data?.entries);
  const distinct = useSelector(
    (state) => state.rootReducer?.data?.data?.distinct
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
    ,
  ];

  // 'rgba(255, 99, 132, 0.2)',
  // 'rgba(54, 162, 235, 0.2)',
  // 'rgba(255, 206, 86, 0.2)',
  // 'rgba(75, 192, 192, 0.2)',
  // 'rgba(153, 102, 255, 0.2)',
  // 'rgba(255, 159, 64, 0.2)',

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

  useEffect(() => {
    dispatch(
      getAllSortedDataThunk({
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
      })
    );

    dispatch(
      getAllDistinctDataThunk({
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
      })
    );
  }, [searchParams]);

  // drop down
  //sorting params
  const [selectdSortParam, setSelectedSortParam] = useState(options[0]);
  const [selectdSortDirecton, setSelectedSortDirection] = useState();
  const [selectdSortFrom, setSelectedSortFrom] = useState();
  const [selectdSortTo, setSelectedSortTo] = useState();
  const [sortOptions, setSortOptions] = useState([]);

  const [selectedAttribute, setSelectedAttribute] = useState(attributes[0]);
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
  }, [searchParams]);

  // this useeffect is used to set the sortValue onchnage of sort Param
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params["sortValue"] = 1;
    setSearchParams(createSearchParams(params));
    setSelectedSortDirection(1);
    setSortOptions(distinct?.[searchParams.get("sortParam")]);
    if (!searchParams.get("sortParam")) {
      searchParams.delete("from_data");
      searchParams.delete("to_data");
      searchParams.delete("sortValue");
    }
  }, [searchParams.get("sortParam"), distinct]);

  const formatedSortParamVsDataParamSum = (data, sortParam, dataParam) => {
    let formattedData = {};
    for (const idx in data) {
      const year = data?.[idx]?.[sortParam];
      if (formattedData?.[year]) {
        formattedData[year] = formattedData[year] + data?.[idx]?.[dataParam];
      } else {
        formattedData[year] = data?.[idx]?.[dataParam];
      }
    }
    delete formattedData[null];
    return formattedData;
  };

  const formatedSortParamVsAll = (data, sortParam) => {
    let formattedData = {};
    for (const idx in data) {
      const key = data?.[idx]?.[sortParam];
      if (formattedData?.[key]) {
        for (const value of attributes) {
          formattedData[key][value?.key] =
            formattedData[key][value?.key] + data?.[idx]?.[value?.key];
        }
      } else {
        formattedData[key] = {};
        for (const value of attributes) {
          formattedData[key][value?.key] = data?.[idx]?.[value?.key]
            ? data?.[idx]?.[value?.key]
            : 0;
        }
      }
    }
    delete formattedData[null];
    return formattedData;
  };

  return (
    <div className="dash-container">
      <div className="drop-down-root-cont">
        <div className="drop-down-cont">
          Search By
          <Dropdown
            paramName={"sortParam"}
            options={options}
            selectedOption={selectdSortParam}
            onSelectedOptionChange={setSelectedSortParam}
          />
        </div>
        <div className="drop-down-cont">
          From
          <Dropdown
            paramName={"from_data"}
            options={sortOptions}
            selectedOption={selectdSortFrom}
            onSelectedOptionChange={setSelectedSortFrom}
          />
        </div>
        <div className="drop-down-cont">
          To
          <Dropdown
            paramName={"to_data"}
            options={sortOptions}
            selectedOption={selectdSortTo}
            onSelectedOptionChange={setSelectedSortTo}
          />
        </div>
      </div>
      <FilterTabs />
      <div className="charts-grid">
        <div className="drop-down-cont var-select">
          Attribute
          <Dropdown
            paramName={"attribute"}
            options={attributes}
            selectedOption={selectedAttribute}
            onSelectedOptionChange={setSelectedAttribute}
          />
        </div>
        <div className="line1 chart-container elivate-shadow">
          <LineChart
            data={formatedSortParamVsDataParamSum(
              data,
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
          />
        </div>
        <div className="bar1 chart-container elivate-shadow">
          <BarChart
            data={formatedSortParamVsDataParamSum(
              data,
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
          />
        </div>
        <div className="bar2 chart-container elivate-shadow">
          <BarChartMultiple
            data={formatedSortParamVsAll(data, selectdSortParam?.key)}
            keys={attributes}
            borderColor={[]}
            bgColor={[]}
            label={[`${"temp"} Sum`]}
            title={`Combined Sum per year`}
          />
        </div>
        <div className="line2 chart-container elivate-shadow">
          <LineChartMultiple
            data={formatedSortParamVsAll(data, selectdSortParam?.key)}
            keys={attributes}
            borderColor={[]}
            bgColor={[]}
            label={[`Combined Sum`]}
            title={`Combined Sum per year`}
          />
        </div>
        <div className="chart-container elivate-shadow">
          <RadarChart
            data={formatedSortParamVsDataParamSum(
              data,
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
          />
        </div>
      </div>
      {/* <PieChart data={formatedSortParamVsDataParamSum(data, chartSortParam "intensity")}  borderColor={borderColor} bgColor={bgColor} label={"Line Chart"}/> */}
      {data?.map?.((elm) => {
        return <p>{elm?.title}</p>;
      })}
    </div>
  );
}

export default Dashboard;
