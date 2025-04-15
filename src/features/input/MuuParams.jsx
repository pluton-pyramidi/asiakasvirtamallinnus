import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setMuu, calculateInsufficencyRateMuu } from "./muuSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";

// This feature renders the set of input fields and submit button for inputting/changing the Muu parameter variables in the Muu state slice
export default function MuuParams() {
  const muu = useSelector((state) => state.muu);
  const dispatch = useDispatch();
  const [input, setInput] = useState(muu);
  const setAction = setMuu;
  const insufficiencyRateMuu = useSelector(calculateInsufficencyRateMuu);
  const muuToQueueRate = insufficiencyRateMuu;

  // Track whether the input has been modified
  const [isModified, setIsModified] = useState(false);

  // Check if the input differs from the initial state
  useEffect(() => {
    setIsModified(JSON.stringify(input) !== JSON.stringify(muu));
  }, [input, muu]);

  // Update local input state when the input is changed
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  // Submit the local input to global store and run the simulation
  // This function is imported from utils
  const handleSubmit = () => {
    handleSubmitAndRun(dispatch, input, setAction);
    setIsModified(false); // Reset the modified state after submission
  };

  return (
    <Box>
      <PercentageInput
        label="Muu: Hoito riittävää (ei jatkohoidon tarvetta):"
        value={input.sufficiencyRateMuu}
        handleChange={(e) => handleInputChange("sufficiencyRateMuu", Number(e.target.value))}
      />
      <Typography>Asiakas palaa suoraan takaisin jonoon per kuukausi: {Math.round(muuToQueueRate * 100)} %</Typography>
      <Button
        onClick={handleSubmit}
        style={{
          backgroundColor: isModified ? "orange" : "gray",
          color: "white",
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
