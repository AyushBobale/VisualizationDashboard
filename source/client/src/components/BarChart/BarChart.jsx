import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";
import { useSelector } from "react-redux";

const BarChart = ({
  data,
  label,
  bgColor,
  borderColor,
  title,
  options,
  redraw,
}) => {
  const responsiveWindow = useResponsiveWindow();
  const sideBar = useSelector((state) => state.rootReducer.data.redrawCharts);

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
        key={JSON.stringify(sideBar)}
      />
    </div>
  );
};

export default BarChart;
