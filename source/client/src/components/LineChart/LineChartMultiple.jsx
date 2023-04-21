import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import React from "react";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";

function LineChartMultiple({ data, label, bgColor, borderColor, title, keys }) {
  const responsiveWindow = useResponsiveWindow();
  const options = {
    scales: {
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
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
    <div className="inner-chart-container">
      <Line
        data={dataNew}
        options={options}
        height={responsiveWindow?.phone ? 250 : null}
      />
    </div>
  );
}

export default LineChartMultiple;
