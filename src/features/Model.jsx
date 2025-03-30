import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { BoxSx } from "../utils/ComponentSx";
import SelectViewButton from "./view/SelectViewButton";

// This component houses the buttons which control which set of values is displayed for inputting/changing input.
export default function Model() {
  return (
    <Box sx={BoxSx}>
      <Typography>[Mallipuu tähän]</Typography>

      <SelectViewButton
        viewName="Alkutilanne"
        viewId="patientInput"
      ></SelectViewButton>
      <SelectViewButton
        viewName="Ensijäsennys"
        viewId="ensijasennys"
      ></SelectViewButton>
      <SelectViewButton
        viewName="Hoitoonohjaus"
        viewId="hoitoonohjaus"
      ></SelectViewButton>
      <SelectViewButton viewName="TAU" viewId="tau"></SelectViewButton>
      <SelectViewButton viewName="P1" viewId="p1"></SelectViewButton>
      <SelectViewButton viewName="P2" viewId="p2"></SelectViewButton>
      <SelectViewButton viewName="Muu" viewId="muu"></SelectViewButton>
    </Box>
  );
}
