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
        filter: {
          end_year: searchParams.get("end_year")
            ? searchParams.get("end_year")
            : undefined,
          country: searchParams.get("country")
            ? searchParams.get("country")
            : undefined,
        },
      })
    );

    dispatch(getAllDistinctDataThunk());
  }, [searchParams]);

  // drop down
  const [selectdSortParam, setSelectedSortParam] = useState();
  const [selectedEndYear, setSelectedEndYear] = useState(
    distinct?.end_year?.[0]
  );
  const [selectedCountry, setSelectedCountry] = useState(
    distinct?.country?.[0]
  );

  useEffect(() => {
    setSelectedEndYear(distinct?.end_year?.[0]);
    setSelectedCountry(distinct?.country?.[0]);
  }, [distinct]);

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
          <Dropdown
            paramName={"end_year"}
            options={distinct?.end_year}
            selectedOption={selectedEndYear}
            onSelectedOptionChange={setSelectedEndYear}
          />
        </div>
        <div className="drop-down-cont">
          <Dropdown
            paramName={"country"}
            options={distinct?.country}
            selectedOption={selectedCountry}
            onSelectedOptionChange={setSelectedCountry}
          />
        </div>
      </div>
      {data?.map?.((elm) => {
        return <p>{elm?.title}</p>;
      })}
    </div>
  );
}

export default Dashboard;
