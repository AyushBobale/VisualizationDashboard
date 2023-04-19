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
import LineChart from "../../components/LineChart/LineChart";
import LineChartMultiple from "../../components/LineChart/LineChartMultiple";
import PieChart from "../../components/Piechart/PieChart";

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

  const attributes = [
    {
      value: "Relevance",
      key: "relevance",
      borderColor: "rgba(255,110,110,0.5)",
      backGroundColor: "rgba(255,110,110,1)",
    },
    {
      value: "Intensity",
      key: "intensity",
      borderColor: "rgba(110,255,110,0.5)",
      backGroundColor: "rgba(110,255,110,1)",
    },
    {
      value: "Impact",
      key: "impact",
      borderColor: "rgba(110,110,255,0.5)",
      backGroundColor: "rgba(110,110,255,1)",
    },
    {
      value: "Likelihood",
      key: "likelihood",
      borderColor: "rgba(255,255,110,0.5)",
      backGroundColor: "rgba(255,255,110,1)",
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

        filter: {
          country: searchParams.get("country")
            ? searchParams.get("country")
            : undefined,
          end_year: searchParams.get("end_year_from")
            ? searchParams.get("end_year_from")
            : undefined,
        },
      })
    );

    dispatch(getAllDistinctDataThunk());
  }, [searchParams]);

  // drop down
  //sorting params
  const [selectdSortParam, setSelectedSortParam] = useState(options[0]);
  const [selectdSortDirecton, setSelectedSortDirection] = useState();
  const [selectdSortFrom, setSelectedSortFrom] = useState();
  const [selectdSortTo, setSelectedSortTo] = useState();
  const [sortOptions, setSortOptions] = useState([]);

  // lower tabs
  const [selectedCountry, setSelectedCountry] = useState(
    distinct?.country?.[0]
  );

  const [selectedAttribute, setSelectedAttribute] = useState(attributes[0]);
  // this use effect is used to refelect the changes from link to state vars
  useEffect(() => {
    setSelectedCountry(searchParams.get("country"));
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

  const borderColor = "rgba(255, 130, 130, 0.5)";
  const bgColor = "white";

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

  // console.log(
  //   attributes?.filter((elm) => selectedAttribute?.key == elm.key)?.[0]
  //     ?.backGroundColor
  // );

  return (
    <div className="dash-container">
      Dashboard
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
      </div>
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
      </div>
      {/* <PieChart data={formatedSortParamVsDataParamSum(data, chartSortParam "intensity")}  borderColor={borderColor} bgColor={bgColor} label={"Line Chart"}/> */}
      {data?.map?.((elm) => {
        return <p>{elm?.title}</p>;
      })}
    </div>
  );
}

export default Dashboard;
