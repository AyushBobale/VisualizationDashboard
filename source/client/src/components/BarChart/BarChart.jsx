import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react";

const BarChart = ({ data, label, bgColor, borderColor, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.8,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const dataNew = {
    labels: Object.keys(data),
    datasets: [
      {
        label: label?.[0],
        backgroundColor: bgColor,
        borderColor: borderColor,
        data: Object.values(data),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar data={dataNew} options={options} />
    </div>
  );
};

export default BarChart;
