import { Box } from "@mui/material";
import { BoxSx } from "../utils/ComponentSx.jsx";
import { useRef, useState } from "react";
import { LineChartDraw } from "../components/LineChart.jsx";
import { useQueueData } from "../hooks/useQueueData.js";
import { useElementSize } from "../hooks/useElementSize.js";
import { D3Chart } from "../utils/D3Chart.jsx";

export const QueueChart = () => {
  const queueData = useQueueData();

  // In case we want to show multiple charts at some point.
  const charts = [
    {
      id: "queueChart",
      options: {},
      chartLoadFunction: () => Promise.resolve(queueData),
      chartDrawFunction: LineChartDraw,
      chartResizeFunction: LineChartDraw, // If no special resize code is needed, use the draw function for both draw and resize.
    },
  ];

  const refCharts = useRef(null);

  const { width: chartWidth, height: chartHeight } = useElementSize(refCharts);

  const [showChart, setShowChart] = useState(charts.map((c) => c.id));

  const [resize, setResize] = useState(false);
  const [reload, setReload] = useState(false);

  let cellWidth = 0,
    cellHeight = 0;
  if (chartWidth) {
    // Calculate grid dimensions based on number of visible charts and a reasonable target aspect ratio.
    const chartCount = showChart.length;
    const aspectRatio = chartWidth / chartHeight;
    const targetAspectRatio = 16 / 9;
    const normalizedAspectRatio = aspectRatio / targetAspectRatio;
    const rows = Math.max(1, Math.floor(Math.sqrt(chartCount / normalizedAspectRatio)));
    const cols = Math.ceil(chartCount / rows);
    cellWidth = chartWidth / cols;
    cellHeight = chartHeight / rows;
  }

  return (
    <Box ref={refCharts} sx={{ ...BoxSx, height: "400px" }} id="queue-chart-box" component="section">
      {charts.map((c) =>
        showChart.includes(c.id) ? (
          <D3Chart
            id={`chart-${c.id}`}
            key={c.id}
            width={cellWidth}
            height={cellHeight}
            resize={resize}
            reload={reload}
            options={c.options}
            chartLoadFunction={c.chartLoadFunction}
            chartDrawFunction={c.chartDrawFunction}
            chartResizeFunction={c.chartResizeFunction}
          />
        ) : null
      )}
    </Box>
  );
};
