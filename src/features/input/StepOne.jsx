import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button } from "@mui/material";
import { setStepOne } from "./stepOneSlice";

// This feature renders the set of input fields and submit button for inputting/changing the StepOne labor variables in the StepOne state slice
export default function StepOne() {
  const stepOne = useSelector((state) => state.stepOne);
  const dispatch = useDispatch();
  const [input, setInput] = useState(stepOne);

  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };
  // handleSubmit on the other hand manages the dispatch of the same state values to the Redux state store
  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setStepOne(input));
  };

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
