import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BoxSx } from "../customStyles/ComponentSx";

export default function ResultsNumbers() {
  return (
    <Box sx={BoxSx}>
      <Typography>Tulokset lukuina tähän</Typography>
    </Box>
  );
}
