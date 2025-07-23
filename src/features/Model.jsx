import * as React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { BoxSx } from "../utils/ComponentSx";
import SelectViewButton from "./view/SelectViewButton";

// This component houses the buttons which control which set of values is displayed for inputting/changing input.
export default function Model() {
  return (
    <Box sx={BoxSx}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid size={12}>
          <Typography>[Mallipuu tähän]</Typography>
        </Grid>
        <Grid size={12}></Grid>

        <Grid size={1.5}>
          <SelectViewButton viewName="Alkutilanne" viewId="patientInput"></SelectViewButton>
        </Grid>
        <Grid size={1.5}>
          <SelectViewButton viewName="Ensijäsennys" viewId="ensijasennys"></SelectViewButton>
        </Grid>
        <Grid size={1.5}>
          <SelectViewButton viewName="Hoitoonohjaus" viewId="hoitoonohjaus"></SelectViewButton>
        </Grid>
        <Grid size={1.5}>
          <SelectViewButton viewName="TAU" viewId="tau"></SelectViewButton>
        </Grid>
        <Grid size={1.5}>
          <SelectViewButton viewName="P1" viewId="p1"></SelectViewButton>
        </Grid>
        <Grid size={1.5}>
          <SelectViewButton viewName="P2" viewId="p2"></SelectViewButton>
        </Grid>
        <Grid size={1.5}>
          <SelectViewButton viewName="Muu" viewId="muu"></SelectViewButton>
        </Grid>
      </Grid>
    </Box>
  );
}
