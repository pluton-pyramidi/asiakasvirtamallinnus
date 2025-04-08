import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setStepTwo } from "./stepTwoSlice";
import {
  calculateInsufficencyRateStepTwo,
  calculateStepTwoToQueueRate,
} from "./stepTwoSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";

// This feature renders the set of input fields and submit button for inputting/changing the StepTwo parameter variables in the StepTwo state slice
export default function StepTwoParams() {
  const stepTwo = useSelector((state) => state.stepTwo);
  const insufficiencyRateStepTwo = useSelector(
    calculateInsufficencyRateStepTwo
  );
  const stepTwoToQueueRate = useSelector(calculateStepTwoToQueueRate);
  const dispatch = useDispatch();
  const [input, setInput] = useState(stepTwo);
  const setAction = setStepTwo;

  // Update local input state when the input is changed
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  // Submit the local input to global store and run the simulation
  // This function is imported from utils
  const handleSubmit = () => handleSubmitAndRun(dispatch, input, setAction);

  return (
    <Box>
      <PercentageInput
        label="Hoito riittävää (ei jatkohoidon tarvetta):"
        value={input.sufficiencyRateStepTwo}
        handleChange={(e) =>
          handleInputChange("sufficiencyRateStepTwo", Number(e.target.value))
        }
      />
      <Typography>
        Hoito ei riitä (jatkohoidon tarve):{" "}
        {Math.round(insufficiencyRateStepTwo * 100)} %
      </Typography>
      <PercentageInput
        label="Jatkohoito: Ohjataan muuhun hoitoon per kuukausi"
        value={input.stepTwoToMuuRate}
        handleChange={(e) =>
          handleInputChange("stepTwoToMuuRate", Number(e.target.value))
        }
      />
      <Typography>
        Jatkohoito: Asiakas palaa suoraan takaisin jonoon per kuukausi:{" "}
        {Math.round(stepTwoToQueueRate * 100)} %
      </Typography>
      <NumberInput
        label="Tapaamisen keskimääräinen kesto sis. valmistautumisen ja kirjaukset (min)"
        value={input.meetingDurationStepTwo}
        handleChange={(e) =>
          handleInputChange("meetingDurationStepTwo", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Työajankäytön tehokkuus-%"
        value={input.laborEfficiencyStepTwo}
        handleChange={(e) =>
          handleInputChange("laborEfficiencyStepTwo", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
