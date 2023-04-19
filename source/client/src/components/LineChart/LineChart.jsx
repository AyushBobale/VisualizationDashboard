import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import React from "react";

function LineChart({ data, label, bgColor, borderColor }) {
  const labels = ["January", "February", "March", "April", "May", "June"];
  console.log(Object.values(data));

  const dataTemp = {
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
      <Line data={dataTemp} />
    </div>
  );
}

export default LineChart;
