import * as React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { BoxSx } from "../utils/ComponentSx";
import PatientInput from "./input/PatientInput";
import Ensijasennys from "./input/Ensijasennys";
import Hoitoonohjaus from "./input/Hoitoonohjaus";
import Tau from "./input/Tau";
import StepOne from "./input/StepOne";
import StepTwo from "./input/StepTwo";

// InputBlock houses the input fields for each set of values, based on which view state is active
export default function InputBlock() {
  const currentView = useSelector((state) => state.view.currentView);

  return (
    <Box sx={{ ...BoxSx, minHeight: "450px" }}>
      <Typography>Ohjeet tähän</Typography>
      <Box>
        {currentView === "patientInput" && (
          <Box>
            Alkutilanne <PatientInput></PatientInput>
          </Box>
        )}
        {currentView === "ensijasennys" && (
          <Box>
            Ensijäsennys <Ensijasennys></Ensijasennys>
          </Box>
        )}
        {currentView === "hoitoonohjaus" && (
          <Box>
            Hoitoonohjaus <Hoitoonohjaus></Hoitoonohjaus>
          </Box>
        )}
        {currentView === "tau" && (
          <Box>
            TAU <Tau></Tau>
          </Box>
        )}
        {currentView === "p1" && (
          <Box>
            P1 <StepOne></StepOne>
          </Box>
        )}
        {currentView === "p2" && (
          <Box>
            P2 <StepTwo></StepTwo>
          </Box>
        )}
        {currentView === "muu" && <Box>Muu</Box>}
      </Box>
    </Box>
  );
}
