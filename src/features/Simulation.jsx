import * as React from "react";
import { Grid } from "@mui/material";
import Model from "./Model";
import InputBlock from "./InputBlock";
import Parameters from "./Parameters";
import { QueueChart } from "./QueueChart";
import ResultsNumbers from "./ResultsNumbers";
import ResultsNumbers2 from "./ResultsNumbers2";

export default function Simulation() {
  return (
    <Grid
      container
      spacing={2}
      id="simulation-grid-container"
      direction="row"
      sx={{ justifyContent: "space-evenly", alignItems: "flex-start" }}
    >
      <Grid size={12}>
        <Model></Model>
      </Grid>
      <Grid size={6}>
        <InputBlock></InputBlock>
      </Grid>
      <Grid size={6}>
        <Parameters></Parameters>
      </Grid>
      <Grid size={12}>
        <QueueChart></QueueChart>
      </Grid>
      <Grid size={6}>
        <ResultsNumbers></ResultsNumbers>
      </Grid>
      <Grid size={6}>
        <ResultsNumbers2></ResultsNumbers2>
      </Grid>
    </Grid>
  );
}
