import * as React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { BoxSx } from "../utils/ComponentSx";
import IntegerInput from "./input/IntegerInput";
import Start from "./input/Start";
import Ej from "./input/Ej";

export default function InputBlock() {
  const currentView = useSelector((state) => state.view.currentView);

  return (
    <Box sx={BoxSx}>
      <Typography>Ohjeet tähän</Typography>
      <Box>
        {currentView === "alkutilanne" && (
          <Box>
            Alkutilanne <Start></Start>
          </Box>
        )}
        {currentView === "ensijasennys" && (
          <Box>
            Ensijäsennys <Ej></Ej>
          </Box>
        )}
        {currentView === "hoitoonohjaus" && <Box>Hoitoonohjaus </Box>}
        {currentView === "tau" && <Box>TAU</Box>}
        {currentView === "p1" && <Box>P1</Box>}
        {currentView === "p2" && <Box>P2</Box>}
        {currentView === "muu" && <Box>Muu</Box>}
      </Box>
    </Box>
  );
}
