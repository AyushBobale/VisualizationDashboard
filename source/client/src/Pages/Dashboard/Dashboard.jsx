import "./Dashboard.css";

import React, { useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";

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
      key: "end_year_from",
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
        end_year_from: searchParams.get("end_year_from")
          ? searchParams.get("end_year_from")
          : undefined,
        end_year_to: searchParams.get("end_year_to")
          ? searchParams.get("end_year_to")
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
  const [selectdSortParam, setSelectedSortParam] = useState();
  const [selectedEndYearFrom, setSelectedEndYearFrom] = useState(
    distinct?.end_year?.[0]
  );
  const [selectedEndYearTo, setSelectedEndYearTo] = useState(
    distinct?.end_year?.[0]
  );
  const [selectedCountry, setSelectedCountry] = useState(
    distinct?.country?.[0]
  );

  useEffect(() => {
    setSelectedEndYearFrom(searchParams.get("end_year_from"));
    setSelectedEndYearTo(searchParams.get("end_year_to"));
    setSelectedCountry(searchParams.get("country"));
  }, [searchParams]);

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
          <Dropdown
            paramName={"sortParam"}
            options={options}
            selectedOption={selectdSortParam}
            onSelectedOptionChange={setSelectedSortParam}
          />
        </div>
      </div>
      <div className="drop-down-root-cont">
        <div className="drop-down-cont">
          End year
          <Dropdown
            paramName={"end_year_from"}
            options={distinct?.end_year}
            selectedOption={selectedEndYearFrom}
            onSelectedOptionChange={setSelectedEndYearFrom}
          />
        </div>
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
