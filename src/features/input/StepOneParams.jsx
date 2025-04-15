import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setStepOne } from "./stepOneSlice";
import { calculateInsufficencyRateStepOne, calculateStepOneToQueueRate } from "./stepOneSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";

// This feature renders the set of input fields and submit button for inputting/changing the StepOne parameter variables in the StepOne state slice
export default function StepOneParams() {
  const stepOne = useSelector((state) => state.stepOne);
  const insufficiencyRateStepOne = useSelector(calculateInsufficencyRateStepOne);
  const stepOneToQueueRate = useSelector(calculateStepOneToQueueRate);
  const dispatch = useDispatch();
  const [input, setInput] = useState(stepOne);
  const setAction = setStepOne;

  // Track whether the input has been modified
  const [isModified, setIsModified] = useState(false);

  // Check if the input differs from the initial state
  useEffect(() => {
    setIsModified(JSON.stringify(input) !== JSON.stringify(stepOne));
  }, [input, stepOne]);

  // handleInputChange manages the local state ("input") visible in the input fields.
  // It also enforces data validation so that the total input does not exceed 100 %.
  const handleInputChange = (field, value) => {
    setInput((prevInput) => {
      const newInput = { ...prevInput, [field]: value };
      const total = newInput.stepOneToMuuRate + newInput.stepOneToStepTwoRate;

      if (total > 1) {
        const excess = total - 1;
        if (field === "stepOneToMuuRate") {
          newInput.stepOneToStepTwoRate = Math.max(0, newInput.stepOneToStepTwoRate - excess);
        } else {
          newInput.stepOneToMuuRate = Math.max(0, newInput.stepOneToMuuRate - excess);
        }
      }

      // Round the values to two decimal places
      newInput.stepOneToMuuRate = Math.round(newInput.stepOneToMuuRate * 100) / 100;
      newInput.stepOneToStepTwoRate = Math.round(newInput.stepOneToStepTwoRate * 100) / 100;

      return newInput;
    });
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
        value={input.sufficiencyRateStepOne}
        handleChange={(e) => handleInputChange("sufficiencyRateStepOne", Number(e.target.value))}
      />
      <Typography>Hoito ei riitä (jatkohoidon tarve): {Math.round(insufficiencyRateStepOne * 100)} %</Typography>
      <PercentageInput
        label="Jatkohoito: Ohjataan toiselle portaalle per kuukausi"
        value={input.stepOneToStepTwoRate}
        handleChange={(e) => handleInputChange("stepOneToStepTwoRate", Number(e.target.value))}
      />
      <PercentageInput
        label="Jatkohoito: Ohjataan muuhun hoitoon per kuukausi"
        value={input.stepOneToMuuRate}
        handleChange={(e) => handleInputChange("stepOneToMuuRate", Number(e.target.value))}
      />
      <Typography>
        Jatkohoito: Asiakas palaa suoraan takaisin jonoon per kuukausi: {Math.round(stepOneToQueueRate * 100)} %
      </Typography>
      <NumberInput
        label="Tapaamisen keskimääräinen kesto sis. valmistautumisen ja kirjaukset (min)"
        value={input.meetingDurationStepOne}
        handleChange={(e) => handleInputChange("meetingDurationStepOne", Number(e.target.value))}
      />
      <PercentageInput
        label="Työajankäytön tehokkuus-%"
        value={input.laborEfficiencyStepOne}
        handleChange={(e) => handleInputChange("laborEfficiencyStepOne", Number(e.target.value))}
      />
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
