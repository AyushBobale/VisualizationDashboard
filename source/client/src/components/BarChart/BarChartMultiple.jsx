import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react";

const BarChartMultiple = ({
  data,
  label,
  bgColor,
  borderColor,
  title,
  keys,
}) => {
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
  for (const val of keys || []) {
    console.log(val?.value);
  }
  console.log(
    keys?.map((elm, idx) => {
      return {
        label: elm?.value,
        backgroundColor: bgColor?.[idx],
        borderColor: borderColor?.[idx],
        data: Object.values(data)?.map((elmValue) => elmValue?.[elm?.key]),
      };
    })
  );
  const dataNew = {
    labels: Object.keys(data),
    datasets: keys?.map((elm, idx) => {
      return {
        label: elm?.value,
        backgroundColor: elm?.backGroundColor,
        borderColor: elm?.borderColor,
        data: Object.values(data)?.map((elmValue) => elmValue?.[elm?.key]),
      };
    }),
  };
  return (
    <div>
      <Bar data={dataNew} options={options} />
    </div>
  );
};

export default BarChartMultiple;
