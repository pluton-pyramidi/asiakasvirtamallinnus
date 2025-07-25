import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setStepTwo } from "./stepTwoSlice";
import { calculateHoitoonohjausStepTwo } from "./stepOneSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";
import { SubmitButton } from "../../components/SubmitButton";

// This feature renders the set of input fields and submit button for inputting/changing the StepTwo labor variables in the StepTwo state slice
export default function StepTwo() {
  const stepTwo = useSelector((state) => state.stepTwo);
  const hoitoonohjausStepTwo = useSelector(calculateHoitoonohjausStepTwo);
  const dispatch = useDispatch();
  const [input, setInput] = useState(stepTwo);
  const setAction = setStepTwo;

  // Track whether the input has been modified
  const [isModified, setIsModified] = useState(false);

  // Check if the input differs from the initial state
  useEffect(() => {
    setIsModified(JSON.stringify(input) !== JSON.stringify(stepTwo));
  }, [input, stepTwo]);

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
      <Typography>Hoitoonohjaus: {Math.round(hoitoonohjausStepTwo * 100)} %</Typography>
      <NumberInput
        label="Tekijöitä"
        value={input.laborStepTwo}
        handleChange={(e) => handleInputChange("laborStepTwo", Number(e.target.value))}
      />
      <PercentageInput
        label="Työaika-%"
        value={input.laborPercentageStepTwo}
        handleChange={(e) => handleInputChange("laborPercentageStepTwo", Number(e.target.value))}
      />
      <SubmitButton onClick={handleSubmit} isModified={isModified} />
    </Box>
  );
}
