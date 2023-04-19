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
import Dropdown from "../../components/Dropdown/Dropdown";
import LineChart from "../../components/LineChart/LineChart";
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
  const [selectdSortParam, setSelectedSortParam] = useState();
  const [selectdSortDirecton, setSelectedSortDirection] = useState();
  const [selectdSortFrom, setSelectedSortFrom] = useState();
  const [selectdSortTo, setSelectedSortTo] = useState();
  const [sortOptions, setSortOptions] = useState([]);

  // lower tabs
  const [selectedCountry, setSelectedCountry] = useState(
    distinct?.country?.[0]
  );

  // this use effect is used to refelect the changes from link to state vars
  useEffect(() => {
    setSelectedCountry(searchParams.get("country"));
    setSelectedSortFrom(searchParams.get("from_data"));
    setSelectedSortTo(searchParams.get("to_data"));
    setSelectedSortParam(
      options?.filter((elm) => elm.key == searchParams.get("sortParam"))?.[0]
    );
  }, [searchParams]);

  // this useeffect is used to set the sortValue onchnage of sort Param
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params["sortValue"] = 1;
    setSearchParams(createSearchParams(params));
    setSelectedSortDirection(1);
    setSortOptions(distinct?.[searchParams.get("sortParam")]);
  }, [searchParams.get("sortParam"), distinct]);

  console.log(sortOptions);

  const borderColor = "rgba(255, 130, 130, 0.5)";
  const bgColor = "white";

  const formatedSortParamVsDataParamSum = (data, sortParam, dataParam) => {
    let formattedData = {};
    for (const idx in data) {
      const year = data?.[idx]?.[sortParam || "end_year"];
      if (formattedData?.[year]) {
        formattedData[year] =
          formattedData[year] + data?.[idx]?.[dataParam || "intensity"];
      } else {
        formattedData[year] = data?.[idx]?.[dataParam || "intensity"];
      }
    }
    delete formattedData[null];
    return formattedData;
  };

  const [chartSortParam, setChartSortParam] = useState("end_year");
  const [chartDataParam, setChartDataParam] = useState("relevance");

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
        {/* <div className="drop-down-cont">
          End year
          <Dropdown
            paramName={"end_year_from"}
            options={distinct?.end_year}
            selectedOption={selectedEndYearFrom}
            onSelectedOptionChange={setSelectedEndYearFrom}
          />
        </div> */}
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
        <div className="line1">
          <LineChart
            data={formatedSortParamVsDataParamSum(
              data,
              chartSortParam,
              chartDataParam
            )}
            borderColor={borderColor}
            bgColor={bgColor}
            label={`${chartDataParam} Sum`}
            title={`${chartDataParam} Sum per year`}
          />
        </div>
        <div className="bar1">
          <BarChart
            data={formatedSortParamVsDataParamSum(
              data,
              chartSortParam,
              chartDataParam
            )}
            borderColor={bgColor}
            bgColor={borderColor}
            label={[`${chartDataParam} Sum`]}
            title={`${chartDataParam} Sum per year`}
          />
        </div>
        <div className="bar2">
          <BarChart
            data={formatedSortParamVsDataParamSum(
              data,
              chartSortParam,
              chartDataParam
            )}
            borderColor={bgColor}
            bgColor={borderColor}
            label={[`${chartSortParam} Sum`]}
            title={`${chartSortParam} Sum per year`}
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
