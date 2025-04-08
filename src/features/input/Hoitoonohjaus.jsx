import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import {
  calculateHoitoonohjausMuu,
  setHoitoonohjaus,
} from "./hoitoonohjausSlice";

export default function Hoitoonohjaus() {
  const hoitoonohjaus = useSelector((state) => state.hoitoonohjaus);
  const hoitoonohjausMuu = useSelector(calculateHoitoonohjausMuu);
  const dispatch = useDispatch();
  const [input, setInput] = useState(hoitoonohjaus);

  // handleInputChange manages the local state ("input") visible in the input fields.
  // It also enforces data validation so that the total input does not exceed 100 %.
  const handleInputChange = (field, value) => {
    setInput((prevInput) => {
      const newInput = { ...prevInput, [field]: value };
      const total =
        newInput.hoitoonohjausTau + newInput.hoitoonohjausSteppedCare;

      if (total > 1) {
        const excess = total - 1;
        if (field === "hoitoonohjausTau") {
          newInput.hoitoonohjausSteppedCare = Math.max(
            0,
            newInput.hoitoonohjausSteppedCare - excess
          );
        } else {
          newInput.hoitoonohjausTau = Math.max(
            0,
            newInput.hoitoonohjausTau - excess
          );
        }
      }

      // Round the values to two decimal places
      newInput.hoitoonohjausTau =
        Math.round(newInput.hoitoonohjausTau * 100) / 100;
      newInput.hoitoonohjausSteppedCare =
        Math.round(newInput.hoitoonohjausSteppedCare * 100) / 100;

      return newInput;
    });
  };

  // handleSubmit on the other hand manages the dispatch of the same state values to the Redux state store
  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setHoitoonohjaus(input));
  };

  return (
    <Box>
      <PercentageInput
        label="TAU %"
        value={input.hoitoonohjausTau}
        handleChange={(e) =>
          handleInputChange("hoitoonohjausTau", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Porrastettu hoito %"
        value={input.hoitoonohjausSteppedCare}
        handleChange={(e) =>
          handleInputChange("hoitoonohjausSteppedCare", Number(e.target.value))
        }
      />

      <Typography>
        Muu: {""}
        {Math.round(hoitoonohjausMuu * 100)} %
      </Typography>
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
