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

// This feature renders the set of input fields and submit button for inputting/changing the StepTwo parameter variables in the StepTwo state slice
export default function StepTwoParams() {
  const stepTwo = useSelector((state) => state.stepTwo);
  const insufficiencyRateStepTwo = useSelector(
    calculateInsufficencyRateStepTwo
  );
  const stepTwoToQueueRate = useSelector(calculateStepTwoToQueueRate);
  const dispatch = useDispatch();
  const [input, setInput] = useState(stepTwo);

  // handleInputChange manages the local state ("input") visible in the input fields.
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  // handleSubmit on the other hand manages the dispatch of the local state values to the Redux store
  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setStepTwo(input));
  };

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
