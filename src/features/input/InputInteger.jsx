import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, TextField } from "@mui/material";

export default function InputInteger({ fieldTitle, stateId }) {
  const inputState = useSelector((state) => state[stateId]?.value ?? "");
  const dispatch = useDispatch();
  const [sliceAction, setSliceAction] = useState("");

  useEffect(() => {
    const loadSlice = async () => {
      try {
        const module = await import(`./${stateId}Slice.js`);
        console.log(`Loaded slice for stateId: ${stateId}`, module);
        setSliceAction(() => module.setInput);
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
        label={fieldTitle}
        type="number"
        value={inputState}
        onChange={handleChange}
      ></TextField>
      <Typography>{inputState}</Typography>
    </Box>
  );
}
