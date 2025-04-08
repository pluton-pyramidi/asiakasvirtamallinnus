import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button } from "@mui/material";
import { setStepOne } from "./stepOneSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";

// This feature renders the set of input fields and submit button for inputting/changing the StepOne labor variables in the StepOne state slice
export default function StepOne() {
  const stepOne = useSelector((state) => state.stepOne);
  const dispatch = useDispatch();
  const [input, setInput] = useState(stepOne);
  const setAction = setStepOne;

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
        label="Hoitoonohjaus %"
        value={input.hoitoonohjausStepOne}
        handleChange={(e) =>
          handleInputChange("hoitoonohjausStepOne", Number(e.target.value))
        }
      />
      <NumberInput
        label="Tekijöitä"
        value={input.laborStepOne}
        handleChange={(e) =>
          handleInputChange("laborStepOne", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Työaika-%"
        value={input.laborPercentageStepOne}
        handleChange={(e) =>
          handleInputChange("laborPercentageStepOne", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
