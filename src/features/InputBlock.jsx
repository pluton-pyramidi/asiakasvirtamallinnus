import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BoxSx } from "../components/ComponentSx";
import IntegerInput from "../components/IntegerInput";

export default function InputBlock() {
  return (
    <Box sx={BoxSx}>
      <Typography>Ohjeet tähän</Typography>
      <IntegerInput
        fieldTitle="Syötä jono"
        fieldAriaLabel="Syötä jonossa olevien potilaiden lukumäärä"
      ></IntegerInput>
      <IntegerInput
        fieldTitle="Potilaita lisää/kk"
        fieldAriaLabel="Syötä potilaiden lukumäärä, joka tulee jonoon lisää per kuukausi"
      ></IntegerInput>
    </Box>
  );
}
