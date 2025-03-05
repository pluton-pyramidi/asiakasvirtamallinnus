import * as React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { BoxSx } from "../utils/ComponentSx";
import Start from "./input/Start";
import Ensijasennys from "./input/Ensijasennys";
import Hoitoonohjaus from "./input/Hoitoonohjaus";

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
        {currentView === "tau" && <Box>TAU</Box>}
        {currentView === "p1" && <Box>P1</Box>}
        {currentView === "p2" && <Box>P2</Box>}
        {currentView === "muu" && <Box>Muu</Box>}
      </Box>
    </Box>
  );
}
