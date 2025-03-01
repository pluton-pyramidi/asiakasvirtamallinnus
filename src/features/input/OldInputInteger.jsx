import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, TextField } from "@mui/material";

/* Modular number input field. Make sure the stateId prop is consistent with the name of the slice. */
export default function InputInteger({ fieldLabel, stateId }) {
  const inputState = useSelector((state) => state[stateId]?.value ?? "");
  const dispatch = useDispatch();
  const [sliceAction, setSliceAction] = useState("");

  useEffect(() => {
    /* This hook dynamically imports the stateId designated state action */
    const loadSlice = async () => {
      try {
        const module = await import(`./${stateId}Slice.js`);
        console.log(`Loaded slice for stateId: ${stateId}`, module);
        setSliceAction(
          () => module.setInput
        ); /* Thus far this modular number input field only works with a state setter named "setInput" */
      } catch (error) {
        console.error(`Failed to load slice for stateId: ${stateId}`, error);
      }
    };
    loadSlice();
  }, [stateId]);

  const handleChange = (e) => {
    if (sliceAction) {
      console.log(`Dispatching action for stateId: ${stateId} ${sliceAction}`);
      dispatch(sliceAction(Number(e.target.value)));
    } else {
      console.log(`No action found for stateId: ${stateId}`);
    }
  };

  return (
    <Box>
      <TextField
        label={fieldLabel}
        type="number"
        value={inputState}
        onChange={handleChange}
      ></TextField>
      <Typography>{inputState}</Typography>
    </Box>
  );
}
