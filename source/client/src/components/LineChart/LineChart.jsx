import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import React from "react";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";

function LineChart({ data, label, bgColor, borderColor, title }) {
  const responsiveWindow = useResponsiveWindow();
  const options = {
    responsive: true,
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
    <div className="inner-chart-container">
      <Line
        data={dataTemp}
        options={options}
        height={responsiveWindow?.phone ? 200 : null}
      />
    </div>
  );
}

export default LineChart;
