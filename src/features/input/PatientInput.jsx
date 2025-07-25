import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import { Box, Button } from "@mui/material";
import { setPatientInput } from "./patientInputSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";
import { SubmitButton } from "../../components/SubmitButton";

export default function PatientInput() {
  const patientInput = useSelector((state) => state.patientInput);
  const dispatch = useDispatch();
  const [input, setInput] = useState(patientInput);
  const setAction = setPatientInput;

  // Track whether the input has been modified
  const [isModified, setIsModified] = useState(false);

  // Check if the input differs from the initial state
  useEffect(() => {
    setIsModified(JSON.stringify(input) !== JSON.stringify(patientInput));
  }, [input, patientInput]);

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
        label="Jono alussa"
        value={input.initialQueue}
        handleChange={(e) => handleInputChange("initialQueue", Number(e.target.value))}
      />
      <NumberInput
        label="Uusia potilaita/kk"
        value={input.newPatientsPerMonth}
        handleChange={(e) => handleInputChange("newPatientsPerMonth", Number(e.target.value))}
      />
      <SubmitButton onClick={handleSubmit} isModified={isModified} />
    </Box>
  );
}
