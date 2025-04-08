import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setEnsijasennys } from "./ensijasennysSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";

// This feature renders the set of input fields and submit button for inputting/changing the Ensijäsennys parameter variables in the Ensijäsennys state slice
export default function EnsijasennysParams() {
  const ensijasennys = useSelector((state) => state.ensijasennys);
  const dispatch = useDispatch();
  const [input, setInput] = useState(ensijasennys);
  const setAction = setEnsijasennys;

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
