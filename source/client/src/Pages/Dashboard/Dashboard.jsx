import "./Dashboard.css";

import React, { useEffect } from "react";
import {
  getAllDataThunk,
  getAllSortedDataThunk,
} from "../../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rootReducer?.data?.data?.entries);

  useEffect(() => {
    // dispatch(getAllDataThunk());
    dispatch(getAllSortedDataThunk());
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
