import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import React from "react";

function LineChartMultiple({ data, label, bgColor, borderColor, title, keys }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    // resizeDelay: 0,
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
    <div className="responsive-chart-container">
      <Line data={dataNew} options={options} />
    </div>
  );
}

export default LineChartMultiple;
