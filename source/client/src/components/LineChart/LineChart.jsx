import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import React from "react";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";
import { useSelector } from "react-redux";

function LineChart({
  data,
  label,
  bgColor,
  borderColor,
  title,
  options,
  redraw,
}) {
  const responsiveWindow = useResponsiveWindow();
  const sideBar = useSelector((state) => state.rootReducer.data.redrawCharts);

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
        key={JSON.stringify(sideBar)}
      />
    </div>
  );
}

export default LineChart;
