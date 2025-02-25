import * as React from "react";
import { Container } from "@mui/material";
import Model from "./Model";
import InputBlock from "./InputBlock";
import Parameters from "./Parameters";
import ResultsGraph from "./ResultsGraph";
import ResultsNumbers from "./ResultsNumbers";

export default function Simulation() {
  return (
    <Container id="simulation-container">
      <Model></Model>
      <InputBlock></InputBlock>
      <Parameters></Parameters>
      <ResultsGraph></ResultsGraph>
      <ResultsNumbers></ResultsNumbers>
    </Container>
  );
}
