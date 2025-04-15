import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { calculateHoitoonohjausMuu, setHoitoonohjaus } from "./hoitoonohjausSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";

export default function Hoitoonohjaus() {
  const hoitoonohjaus = useSelector((state) => state.hoitoonohjaus);
  const hoitoonohjausMuu = useSelector(calculateHoitoonohjausMuu);
  const dispatch = useDispatch();
  const [input, setInput] = useState(hoitoonohjaus);
  const setAction = setHoitoonohjaus;

  // Track whether the input has been modified
  const [isModified, setIsModified] = useState(false);

  // Check if the input differs from the initial state
  useEffect(() => {
    setIsModified(JSON.stringify(input) !== JSON.stringify(hoitoonohjaus));
  }, [input, hoitoonohjaus]);

  // handleInputChange manages the local state ("input") visible in the input fields.
  // It also enforces data validation so that the total input does not exceed 100 %.
  const handleInputChange = (field, value) => {
    setInput((prevInput) => {
      const newInput = { ...prevInput, [field]: value };
      const total = newInput.hoitoonohjausTau + newInput.hoitoonohjausSteppedCare;

      if (total > 1) {
        const excess = total - 1;
        if (field === "hoitoonohjausTau") {
          newInput.hoitoonohjausSteppedCare = Math.max(0, newInput.hoitoonohjausSteppedCare - excess);
        } else {
          newInput.hoitoonohjausTau = Math.max(0, newInput.hoitoonohjausTau - excess);
        }
      }

      // Round the values to two decimal places
      newInput.hoitoonohjausTau = Math.round(newInput.hoitoonohjausTau * 100) / 100;
      newInput.hoitoonohjausSteppedCare = Math.round(newInput.hoitoonohjausSteppedCare * 100) / 100;

      return newInput;
    });
  };

  // Submit the local input to global store and run the simulation
  // This function is imported from utils
  const handleSubmit = () => {
    handleSubmitAndRun(dispatch, input, setAction);
    setIsModified(false); // Reset the modified state after submission
  };

  return (
    <Box>
      <PercentageInput
        label="TAU %"
        value={input.hoitoonohjausTau}
        handleChange={(e) => handleInputChange("hoitoonohjausTau", Number(e.target.value))}
      />
      <PercentageInput
        label="Porrastettu hoito %"
        value={input.hoitoonohjausSteppedCare}
        handleChange={(e) => handleInputChange("hoitoonohjausSteppedCare", Number(e.target.value))}
      />

      <Typography>
        Muu: {""}
        {Math.round(hoitoonohjausMuu * 100)} %
      </Typography>
      <Button
        onClick={handleSubmit}
        style={{
          backgroundColor: isModified ? "orange" : "gray",
          color: "white",
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
