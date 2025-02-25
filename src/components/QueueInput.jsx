import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQueue,
  incrementQueue,
  decrementQueue,
} from "../features/queueState/queueStateSlice";
import { Box, Button, Typography, TextField } from "@mui/material";

export default function QueueInput() {
  const queueState = useSelector((state) => state.queueState.value);
  const dispatch = useDispatch();

  return (
    <Box>
      <TextField
        label="Syötä jono"
        type="number"
        aria-label="Syötä jonossa olevien potilaiden lukumäärä"
        value={queueState == 0 ? "" : queueState}
        onChange={(e) => dispatch(setQueue(Number(e.target.value)))}
      ></TextField>
      <Typography>{queueState}</Typography>
    </Box>
  );
}
