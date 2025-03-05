import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button } from "@mui/material";
import { setEj } from "./ejSlice";

export default function Ej() {
  const ej = useSelector((state) => state.ej);
  const dispatch = useDispatch();
  const [input, setInput] = useState(ej);

  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setEj(input));
  };

  return (
    <Box>
      <NumberInput
        label="Tekijöitä"
        value={input.laborEj}
        handleChange={(e) =>
          handleInputChange("laborEj", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Työaika-%"
        value={input.laborPercentageEj}
        handleChange={(e) =>
          handleInputChange("laborPercentageEj", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
