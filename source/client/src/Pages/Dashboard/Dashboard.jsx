import "./Dashboard.css";

import React, { useEffect } from "react";
import {
  getAllDataThunk,
  getAllSortedDataThunk,
} from "../../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useSelector((state) => state.rootReducer?.data?.data?.entries);

  useEffect(() => {
    dispatch(
      getAllSortedDataThunk({
        sortParam: searchParams.get("sortParam"),
        sortValue: searchParams.get("sortValue"),
      })
    );
  }, []);

  return (
    <div className="dash-container">
      Dashboard
      <div>
        <button>Sort By</button>
      </div>
      {data?.map?.((elm) => {
        return <p>{elm?.title}</p>;
      })}
    </div>
  );
}

export default Dashboard;
