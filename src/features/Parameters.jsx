import * as React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BoxSx } from "../utils/ComponentSx";
import EnsijasennysParams from "./input/EnsijasennysParams";
import TauParams from "./input/TauParams";
import StepOneParams from "./input/StepOneParams";
import StepTwoParams from "./input/StepTwoParams";
import MuuParams from "./input/MuuParams";
import SimulationParams from "./input/simulationParams";

// Parameters.jsx component houses the input fields for each set of parameters values, based on which view state is active
export default function Parameters() {
  const currentView = useSelector((state) => state.view.currentView);

  return (
    <Box sx={BoxSx}>
      <Typography>Oletukset ja parametrit</Typography>
      {currentView === "patientInput" && <SimulationParams></SimulationParams>}
      {currentView === "ensijasennys" && (
        <Box>
          Ensijäsennys <EnsijasennysParams></EnsijasennysParams>
        </Box>
      )}
      {currentView === "hoitoonohjaus" && <Box>Hoitoonohjaus</Box>}
      {currentView === "tau" && (
        <Box>
          TAU <TauParams></TauParams>
        </Box>
      )}
      {currentView === "p1" && (
        <Box>
          P1 <StepOneParams></StepOneParams>
        </Box>
      )}
      {currentView === "p2" && (
        <Box>
          P2 <StepTwoParams></StepTwoParams>
        </Box>
      )}
      {currentView === "muu" && (
        <Box>
          Muu <MuuParams></MuuParams>
        </Box>
      )}
    </Box>
  );
}
