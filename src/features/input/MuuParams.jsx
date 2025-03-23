import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setMuu } from "./muuSlice";

// This feature renders the set of input fields and submit button for inputting/changing the Muu parameter variables in the Muu state slice
export default function MuuParams() {
  const muu = useSelector((state) => state.muu);
  const dispatch = useDispatch();
  const [input, setInput] = useState(muu);

  // handleInputChange manages the local state ("input") visible in the input fields.
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  // handleSubmit on the other hand manages the dispatch of the local state values to the Redux store
  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setMuu(input));
  };

  return (
    <Box>
      <PercentageInput
        label="Muu: Asiakas palaa suoraan takaisin jonoon per kuukausi (loput poistuvat jonosta)"
        value={input.muuToQueueRate}
        handleChange={(e) =>
          handleInputChange("muuToQueueRate", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
