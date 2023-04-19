// ./components/PieChart.js

import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import React from "react";

const PieChart = ({ data, label, bgColor, borderColor }) => {
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
      <Pie data={dataNew} />
    </div>
  );
};

export default PieChart;
