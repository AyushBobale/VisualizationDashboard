import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import React from "react";

function LineChart({ data, label, bgColor, borderColor, title }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

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
      <Line data={dataTemp} options={options} />
    </div>
  );
}

export default LineChart;
