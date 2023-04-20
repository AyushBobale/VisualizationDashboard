import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import React from "react";

const DoughnutChart = ({ data, label, bgColor, borderColor, title }) => {
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
        // label: label?.[0],
        backgroundColor: bgColor,
        borderColor: borderColor,
        data: Object.values(data),
        borderWidth: 1,
      },
    ],
    // labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
    // datasets: [
    //   {
    //     label: "# of Votes",
    //     data: [2, 9, 3, 5, 2, 3],
    //     backgroundColor: "rgba(255, 99, 132, 0.2)",
    //     borderColor: "rgba(255, 99, 132, 1)",
    //     borderWidth: 1,
    //   },
    // ],
  };
  return (
    <div>
      <Doughnut data={dataNew} options={options} />
    </div>
  );
};

export default DoughnutChart;
