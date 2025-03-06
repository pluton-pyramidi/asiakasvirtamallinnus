import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button } from "@mui/material";
import { setHoitoonohjaus } from "./hoitoonohjausSlice";

export default function Hoitoonohjaus() {
  const hoitoonohjaus = useSelector((state) => state.hoitoonohjaus);
  const dispatch = useDispatch();
  const [input, setInput] = useState(hoitoonohjaus);

  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setHoitoonohjaus(input));
  };

  return (
    <Box>
      <PercentageInput
        label="TAU %"
        value={input.hoitoonohjausTAU}
        handleChange={(e) =>
          handleInputChange("hoitoonohjausTAU", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Porrastettu hoito %"
        value={input.hoitoonohjausSteppedCare}
        handleChange={(e) =>
          handleInputChange("hoitoonohjausSteppedCare", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
