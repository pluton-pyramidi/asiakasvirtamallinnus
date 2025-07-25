import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button } from "@mui/material";
import { setTau } from "./tauSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";
import { SubmitButton } from "../../components/SubmitButton";

// This feature renders the set of input fields and submit button for inputting/changing the TAU labor variables in the TAU state slice
export default function Tau() {
  const tau = useSelector((state) => state.tau);
  const dispatch = useDispatch();
  const [input, setInput] = useState(tau);
  const setAction = setTau;

  // Track whether the input has been modified
  const [isModified, setIsModified] = useState(false);

  // Check if the input differs from the initial state
  useEffect(() => {
    setIsModified(JSON.stringify(input) !== JSON.stringify(tau));
  }, [input, tau]);

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
      <NumberInput
        label="Tekijöitä"
        value={input.laborTau}
        handleChange={(e) => handleInputChange("laborTau", Number(e.target.value))}
      />
      <PercentageInput
        label="Työaika-%"
        value={input.laborPercentageTau}
        handleChange={(e) => handleInputChange("laborPercentageTau", Number(e.target.value))}
      />
      <SubmitButton onClick={handleSubmit} isModified={isModified} />
    </Box>
  );
}
