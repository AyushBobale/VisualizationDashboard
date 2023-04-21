import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";

const BarChart = ({ data, label, bgColor, borderColor, title, options }) => {
  const responsiveWindow = useResponsiveWindow();
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     title: {
  //       display: true,
  //       text: title,
  //     },
  //   },
  // };
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
    <div className="inner-chart-container">
      <Bar
        data={dataNew}
        options={options}
        height={responsiveWindow?.phone ? 200 : null}
      />
    </div>
  );
};

export default BarChart;
