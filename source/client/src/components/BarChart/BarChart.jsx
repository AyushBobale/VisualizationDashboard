import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react";

const BarChart = ({ data, label, bgColor, borderColor }) => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const dataNew = {
    labels: Object.keys(data),
    datasets: [
      {
        label: label,
        backgroundColor: bgColor,
        borderColor: borderColor,
        data: Object.values(data),
      },
    ],
  };
  return (
    <div>
      <Bar data={dataNew} />
    </div>
  );
};

export default BarChart;
