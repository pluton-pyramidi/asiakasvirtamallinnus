import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setTau } from "./tauSlice";
import { calculateInsufficencyRateTau, calculateTauToQueueRate } from "./tauSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";
import { SubmitButton } from "../../components/SubmitButton";

// This feature renders the set of input fields and submit button for inputting/changing the TAU parameter variables in the TAU state slice
export default function TauParams() {
  const tau = useSelector((state) => state.tau);
  const insufficiencyRateTau = useSelector(calculateInsufficencyRateTau);
  const tauToQueueRate = useSelector(calculateTauToQueueRate);
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
      <PercentageInput
        label="Hoito riittävää (ei jatkohoidon tarvetta):"
        value={input.sufficiencyRateTau}
        handleChange={(e) => handleInputChange("sufficiencyRateTau", Number(e.target.value))}
      />
      <Typography>Hoito ei riitä (jatkohoidon tarve): {Math.round(insufficiencyRateTau * 100)} %</Typography>
      <PercentageInput
        label="Jatkohoito: Ohjataan muuhun hoitoon per kuukausi"
        value={input.tauToMuuRate}
        handleChange={(e) => handleInputChange("tauToMuuRate", Number(e.target.value))}
      />
      <Typography>
        Jatkohoito: Asiakas palaa suoraan takaisin jonoon per kuukausi: {Math.round(tauToQueueRate * 100)} %
      </Typography>
      <NumberInput
        label="Tapaamisen keskimääräinen kesto sis. valmistautumisen ja kirjaukset (min)"
        value={input.meetingDurationTau}
        handleChange={(e) => handleInputChange("meetingDurationTau", Number(e.target.value))}
      />
      <PercentageInput
        label="Työajankäytön tehokkuus-%"
        value={input.laborEfficiencyTau}
        handleChange={(e) => handleInputChange("laborEfficiencyTau", Number(e.target.value))}
      />
      <SubmitButton onClick={handleSubmit} isModified={isModified} />
    </Box>
  );
}
