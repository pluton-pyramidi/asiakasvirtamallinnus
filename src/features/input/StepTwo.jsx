import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setStepTwo } from "./stepTwoSlice";
import { selectHoitoonohjausStepTwo } from "./stepOneSlice";

export default function StepTwo() {
  const stepTwo = useSelector((state) => state.stepTwo);
  const hoitoonohjausStepTwo = useSelector(selectHoitoonohjausStepTwo);
  const dispatch = useDispatch();
  const [input, setInput] = useState(stepTwo);

  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setStepTwo(input));
  };

  return (
    <Box>
      <Typography>{hoitoonohjausStepTwo}</Typography>
      <NumberInput
        label="Tekijöitä"
        value={input.laborStepTwo}
        handleChange={(e) =>
          handleInputChange("laborStepTwo", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Työaika-%"
        value={input.laborPercentageStepTwo}
        handleChange={(e) =>
          handleInputChange("laborPercentageStepTwo", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
