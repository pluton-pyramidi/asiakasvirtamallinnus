import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialQueueInput } from "../app/store";
import { Box, Button, Typography, TextField } from "@mui/material";

export default function IntegerInput({ fieldTitle, fieldAriaLabel }) {
  const queueState = useSelector((state) => state.initialQueueState.value);
  const dispatch = useDispatch();

  return (
    <Box>
      <TextField
        label={fieldTitle}
        type="number"
        aria-label={fieldAriaLabel}
        value={queueState == 0 ? "" : queueState}
        onChange={(e) => dispatch(setInitialQueueInput(Number(e.target.value)))}
      ></TextField>
      <Typography>{queueState}</Typography>
    </Box>
  );
}
