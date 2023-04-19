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

  useEffect(() => {
    dispatch(
      getAllSortedDataThunk({
        sortParam: searchParams.get("sortParam"),
        sortValue: searchParams.get("sortValue"),
      })
    );

    dispatch(getAllDistinctDataThunk());
  }, []);

  // drop down
  const [selectedOption, setSelectedOption] = useState(distinct?.end_year?.[0]);
  useEffect(() => {
    setSelectedOption(distinct?.end_year?.[0]);
  }, [distinct]);

  const handleSelectedOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dash-container">
      Dashboard
      <div>
        <Dropdown
          options={distinct?.end_year}
          selectedOption={selectedOption}
          onSelectedOptionChange={handleSelectedOptionChange}
        />
      </div>
      {data?.map?.((elm) => {
        return <p>{elm?.title}</p>;
      })}
    </div>
  );
}

export default Dashboard;
