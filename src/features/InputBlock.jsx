import * as React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { BoxSx } from "../utils/ComponentSx";
import Start from "./input/Start";
import Ensijasennys from "./input/Ensijasennys";
import Hoitoonohjaus from "./input/Hoitoonohjaus";
import Tau from "./input/Tau";
import StepOne from "./input/StepOne";

export default function InputBlock() {
  const currentView = useSelector((state) => state.view.currentView);

  return (
    <Box sx={BoxSx}>
      <Typography>Ohjeet tähän</Typography>
      <Box>
        {currentView === "start" && (
          <Box>
            Alkutilanne <Start></Start>
          </Box>
        )}
        {currentView === "ensijasennys" && (
          <Box>
            Ensijäsennys <Ensijasennys></Ensijasennys>
          </Box>
        )}
        {currentView === "hoitoonOhjaus" && (
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
        {currentView === "p2" && <Box>P2</Box>}
        {currentView === "muu" && <Box>Muu</Box>}
      </Box>
    </Box>
  );
}
