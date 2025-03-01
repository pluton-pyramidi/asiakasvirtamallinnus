import * as React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BoxSx } from "../customStyles/ComponentSx";
import IntegerInput from "./input/IntegerInput";

export default function Parameters() {
  const currentView = useSelector((state) => state.view.currentView);

  return (
    <Box sx={BoxSx}>
      <Typography>Oletukset ja parametrit</Typography>
      {currentView === "alkutilanne" && <Box>Alkutilanne</Box>}
      {currentView === "ensijasennys" && <Box>Ensijäsennys</Box>}
      {currentView === "hoitoonohjaus" && <Box>Hoitoonohjaus</Box>}
      {currentView === "tau" && <Box>TAU</Box>}
      {currentView === "p1" && <Box>P1</Box>}
      {currentView === "p2" && <Box>P2</Box>}
      {currentView === "muu" && <Box>Muu</Box>}
    </Box>
  );
}
