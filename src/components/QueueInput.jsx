import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQueue,
  incrementQueue,
  decrementQueue,
} from "../features/queueState/queueStateSlice";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";

export default function QueueInput() {
  const queueState = useSelector((state) => state.queueState.value);
  const dispatch = useDispatch();
  const [queueAmount, setQueueAmount] = useState(0);

  return (
    <Box>
      <TextField
        aria-label="Syötä jonossa olevien potilaiden lukumäärä"
        value={queueAmount}
        onChange={(e) => setQueueAmount(e.target.value)}
      >
        Jonon määrä
      </TextField>
      <Button onClick={() => dispatch(setQueue(Number(queueAmount) || 0))}>
        Syötä jono
      </Button>
      <br></br>
      <Button
        aria-label="Lisää potilas jonoon"
        onClick={() => dispatch(incrementQueue())}
      >
        +
      </Button>
      <Button
        aria-label="Vähennä potilas jonosta"
        onClick={() => dispatch(decrementQueue())}
      >
        -
      </Button>
      <Typography>{queueState}</Typography>
    </Box>
  );
}
