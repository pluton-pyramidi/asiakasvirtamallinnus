import * as React from "react";
import Grid from "@mui/material/Grid";
import Header from "./features/Header";
import Simulation from "./features/Simulation";

export default function App() {
  return (
    <Grid container spacing={1} direction="column" id="app-grid-container">
      <Grid size={12}>
        <Header></Header>
      </Grid>
      <Simulation></Simulation>
    </Grid>
  );
}
