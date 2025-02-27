import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as AllStates from "../../app/store";
import { Box, Button, Typography, TextField } from "@mui/material";

/* IntegerInput needs props from the parent to 1) give the text field labels and 2) the name of state & its reducer to be used by the state reducer factory in store.js. The state and its reducer need to be configured in store.js */
export default function IntegerInput({
  fieldTitle,
  fieldAriaLabel,
  stateId,
  stateSetterId,
}) {
  const queueState = useSelector((state) => state[stateId]?.value ?? "");
  const dispatch = useDispatch();

  return (
    <Box>
      <TextField
        label={fieldTitle}
        type="number"
        aria-label={fieldAriaLabel}
        value={queueState == 0 ? "" : queueState}
        onChange={(e) =>
          AllStates[stateSetterId] &&
          dispatch(AllStates[stateSetterId](Number(e.target.value)))
        }
      ></TextField>
      <Typography>{queueState}</Typography>
    </Box>
  );
}
