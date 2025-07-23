import * as React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { BoxSx } from "../../utils/ComponentSx";

export default function ModelVisual() {
  // Get the simulated queue data from store
  const simulatedQueueData = useSelector((state) => state.balance.value);
  const dataLength = simulatedQueueData.length;
  // Initialize x-axis by creating an array of the same length as the data
  const xAxis = Array.from({ length: dataLength }, (_, i) => i + 1);

  return <Box></Box>;
}
