import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setEnsijasennys } from "./ensijasennysSlice";

export default function EnsijasennysParams() {
  const ensijasennys = useSelector((state) => state.ensijasennys);
  const dispatch = useDispatch();
  const [input, setInput] = useState(ensijasennys);

  // handleInputChange manages the local state ("input") visible in the input fields.
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setEnsijasennys(input));
  };

  return (
    <Box>
      <NumberInput
        label="Tapaamisen keskimääräinen kesto sis. valmistautumisen ja kirjaukset (min)"
        value={input.meetingDurationEnsijasennys}
        handleChange={(e) =>
          handleInputChange(
            "meetingDurationEnsijasennys",
            Number(e.target.value)
          )
        }
      />
      <PercentageInput
        label="Työajankäytön tehokkuus-%"
        value={input.laborEfficiencyEnsijasennys}
        handleChange={(e) =>
          handleInputChange(
            "laborEfficiencyEnsijasennys",
            Number(e.target.value)
          )
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
