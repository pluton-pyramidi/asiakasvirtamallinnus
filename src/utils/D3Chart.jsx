import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { replaceChart } from "./D3ChartHelpers";

// D3Chart
// This chart component supports charts that provide load, draw and resize functions.
// If no special resize code is needed, use the draw function for both draw and resize.
export const D3Chart = (props) => {
  const { id, width, height, resize, options, chartLoadFunction, chartDrawFunction, chartResizeFunction } = props;

  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    // This useEffect runs on component mount and whenever chartLoadFunction changes.
    let isMounted = true;
    chartLoadFunction().then((data) => {
      if (isMounted) setChartData(data);
    });
    return () => {
      isMounted = false;
    };
  }, [chartLoadFunction]);

  // This second useEffect runs on component mount and whenever chartData or w/h change.
  // Use it to resize or draw the chart as needed.
  // The App parent component sets a resize prop to help us decide.
  useEffect(() => {
    // We need daddy before we can render.  Also chartData.
    const divChart = document.getElementById(id);
    if (divChart && chartData) {
      const drawChart = async (divChart) => {
        if (resize) {
          const chartSvg = await chartResizeFunction(chartData, { ...options, width, height });
          replaceChart(divChart, chartSvg);
        } else {
          const chartSvg = await chartDrawFunction(chartData, { ...options, width, height });
          replaceChart(divChart, chartSvg);
        }
      };
      drawChart(divChart, chartData);
    }
  }, [chartData, width, height]);

  return <Box className="d3Chart" id={id}></Box>;
};
