import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BoxSx } from "../components/ComponentSx";
import IntegerInput from "../components/IntegerInput";
import InputView from "../components/InputView";

export default function InputBlock() {
  return (
    <Box sx={BoxSx}>
      <Typography>Ohjeet tähän</Typography>
      <InputView>
        <IntegerInput
          fieldTitle="Syötä jono"
          fieldAriaLabel="Syötä jonossa olevien potilaiden lukumäärä"
          stateId="initialQueue"
          stateSetterId="setInitialQueue"
        ></IntegerInput>
      </InputView>
    </Box>
  );
}
