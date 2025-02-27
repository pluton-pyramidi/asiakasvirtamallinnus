import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { BoxSx } from "../components/ComponentSx";
import ViewButtons from "../components/SelectView";

export default function Model() {
  return (
    <Box sx={BoxSx}>
      <Typography>[Mallipuu tähän]</Typography>
      <ViewButtons></ViewButtons>
    </Box>
  );
}
