import * as React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function QueueChart() {
  // Get the simulated queue data from store
  const simulatedQueueData = useSelector((state) => state.balance.value);

  // Initialize x-axis by creating an array of the same length as the simulationTimeSpan
  const simulationTimeSpan = useSelector(
    (state) => state.simulationParams.simulationTimeSpan
  );
  const xAxis = Array.from({ length: simulationTimeSpan }, (_, i) => i + 1);

  return (
    <Box>
      <LineChart
        width={500}
        height={300}
        series={[
          {
            data: simulatedQueueData,
            label: "Jonotilanteen mallinnettu kehitys",
          },
        ]}
        xAxis={[{ scaleType: "point", data: xAxis }]}
      ></LineChart>
    </Box>
  );
}
