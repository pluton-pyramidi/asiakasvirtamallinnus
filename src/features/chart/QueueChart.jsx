import * as React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { BoxSx } from "../../utils/ComponentSx";
import { LineChart } from "@mui/x-charts/LineChart";

export default function QueueChart() {
  // Get the simulated queue data from store
  const simulatedQueueData = useSelector((state) => state.balance.value);
  const dataLength = simulatedQueueData.length;
  // Initialize x-axis by creating an array of the same length as the data
  const xAxis = Array.from({ length: dataLength }, (_, i) => i + 1);

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
        yAxis={[{ min: 0 }]}
      ></LineChart>
    </Box>
  );
}
