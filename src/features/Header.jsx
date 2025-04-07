import * as React from "react";
import { Box, Typography } from "@mui/material";
import RunSimulation from "./run/runSimulation";

export default function Header() {
  return (
    <Box id="header-box" component="section">
      <Typography
        id="app-main-title"
        variant="h2"
        component="h1"
        align="center"
      >
        Asiakasvirtamallinnus
      </Typography>
      <RunSimulation></RunSimulation>
    </Box>
  );
}
