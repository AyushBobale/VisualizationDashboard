import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import React from "react";
import { useSelector } from "react-redux";

const DoughnutChart = ({ data, bgColor, borderColor, options }) => {
  const sideBar = useSelector((state) => state.rootReducer.data.redrawCharts);
  console.log(sideBar);
  const dataNew = {
    labels: Object.keys(data),
    datasets: [
      {
        backgroundColor: bgColor,
        borderColor: borderColor,
        data: Object.values(data),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="inner-chart-container">
      <Doughnut
        data={dataNew}
        options={options}
        key={JSON.stringify(sideBar)}
      />
    </div>
  );
};

export default DoughnutChart;
