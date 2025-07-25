import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button } from "@mui/material";
import { setEnsijasennys } from "./ensijasennysSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";
import { SubmitButton } from "../../components/SubmitButton";

export default function Ensijasennys() {
  const ensijasennys = useSelector((state) => state.ensijasennys);
  const dispatch = useDispatch();
  const [input, setInput] = useState(ensijasennys);
  const setAction = setEnsijasennys;

  // Update local input state when the input is changed
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  // Track whether the input has been modified
  const [isModified, setIsModified] = useState(false);

  // Check if the input differs from the initial state
  useEffect(() => {
    setIsModified(JSON.stringify(input) !== JSON.stringify(ensijasennys));
  }, [input, ensijasennys]);

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
        value={input.laborEnsijasennys}
        handleChange={(e) => handleInputChange("laborEnsijasennys", Number(e.target.value))}
      />
      <PercentageInput
        label="Työaika-%"
        value={input.laborPercentageEnsijasennys}
        handleChange={(e) => handleInputChange("laborPercentageEnsijasennys", Number(e.target.value))}
      />
      <SubmitButton onClick={handleSubmit} isModified={isModified} />
    </Box>
  );
}
