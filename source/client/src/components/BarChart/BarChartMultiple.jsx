import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React from "react";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";
import { useSelector } from "react-redux";

const BarChartMultiple = ({
  data,
  label,
  bgColor,
  borderColor,
  title,
  keys,
  options,
  redraw,
}) => {
  const responsiveWindow = useResponsiveWindow();
  const sideBar = useSelector((state) => state.rootReducer.data.redrawCharts);

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
        key={JSON.stringify(sideBar)}
      />
    </div>
  );
};

export default BarChartMultiple;
