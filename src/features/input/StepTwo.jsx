import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setStepTwo } from "./stepTwoSlice";
import { calculateHoitoonohjausStepTwo } from "./stepOneSlice";

// This feature renders the set of input fields and submit button for inputting/changing the StepTwo labor variables in the StepTwo state slice
export default function StepTwo() {
  const stepTwo = useSelector((state) => state.stepTwo);
  const hoitoonohjausStepTwo = useSelector(calculateHoitoonohjausStepTwo);
  const dispatch = useDispatch();
  const [input, setInput] = useState(stepTwo);

  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  // handleSubmit on the other hand manages the dispatch of the same state values to the Redux state store
  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setStepTwo(input));
  };

  return (
    <Box>
      <Typography>
        Hoitoonohjaus: {Math.round(hoitoonohjausStepTwo * 100)} %
      </Typography>
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
