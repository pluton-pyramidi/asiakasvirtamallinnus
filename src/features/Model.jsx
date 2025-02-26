import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { BoxSx } from "../components/ComponentSx";

export default function Model() {
  return (
    <Box sx={BoxSx}>
      <Typography>[Mallipuu tähän]</Typography>
      <Button>Nappi jolla valita porras</Button>
    </Box>
  );
}
