import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import React from "react";
import { useResponsiveWindow } from "../../Hooks/useResponsiveWindow";
import { useSelector } from "react-redux";

function LineChartMultiple({ data, title, keys, options, redraw }) {
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
      };
    }),
  };
  return (
    <div className="inner-chart-container">
      <Line
        data={dataNew}
        options={options}
        height={responsiveWindow?.phone ? 250 : null}
        key={JSON.stringify(sideBar)}
      />
    </div>
  );
}

export default LineChartMultiple;
