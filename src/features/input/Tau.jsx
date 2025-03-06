import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button } from "@mui/material";
import { setTau } from "./tauSlice";

export default function Tau() {
  const tau = useSelector((state) => state.tau);
  const dispatch = useDispatch();
  const [input, setInput] = useState(tau);

  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setTau(input));
  };

  return (
    <Box>
      <NumberInput
        label="Tekijöitä"
        value={input.laborTau}
        handleChange={(e) =>
          handleInputChange("laborTau", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Työaika-%"
        value={input.laborPercentageTau}
        handleChange={(e) =>
          handleInputChange("laborPercentageTau", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
