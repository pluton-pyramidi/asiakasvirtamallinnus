import * as React from "react";
import { Grid } from "@mui/material";
import Model from "./Model";
import InputBlock from "./InputBlock";
import Parameters from "./Parameters";
import ResultsGraph from "./ResultsGraph";
import ResultsNumbers from "./ResultsNumbers";

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
        <ResultsGraph></ResultsGraph>
      </Grid>
      <Grid size={12}>
        <ResultsNumbers></ResultsNumbers>
      </Grid>
    </Grid>
  );
}
