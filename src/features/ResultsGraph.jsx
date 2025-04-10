import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BoxSx } from "../utils/ComponentSx";
import QueueChart from "./chart/QueueChart";

export default function ResultsGraph() {
  return (
    <Box sx={BoxSx} align="center">
      <Typography>Kuvaaja</Typography>
      <QueueChart> </QueueChart>
    </Box>
  );
}
