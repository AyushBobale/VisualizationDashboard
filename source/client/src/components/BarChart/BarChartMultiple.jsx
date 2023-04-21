import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";

const BarChartMultiple = ({
  data,
  label,
  bgColor,
  borderColor,
  title,
  keys,
}) => {
  const responsiveWindow = useResponsiveWindow();
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
  const dataNew = {
    labels: Object.keys(data),
    datasets: keys?.map((elm, idx) => {
      return {
        label: elm?.value,
        backgroundColor: elm?.backGroundColor,
        borderColor: elm?.borderColor,
        data: Object.values(data)?.map((elmValue) => elmValue?.[elm?.key]),
        borderWidth: 1,
      };
    }),
  };
  return (
    <div className="inner-chart-container">
      <Bar
        data={dataNew}
        options={options}
        height={responsiveWindow?.phone ? 250 : null}
      />
    </div>
  );
};

export default BarChartMultiple;
