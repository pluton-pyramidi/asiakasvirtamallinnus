import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import { Box, Button } from "@mui/material";
import { setStart } from "./startSlice";

export default function Start() {
  const start = useSelector((state) => state.start);
  const dispatch = useDispatch();
  const [input, setInput] = useState(start);

  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setStart(input));
  };

  return (
    <Box>
      <NumberInput
        label="Jono alussa"
        value={input.initialQueue}
        handleChange={(e) =>
          handleInputChange("initialQueue", Number(e.target.value))
        }
      />
      <NumberInput
        label="Uusia potilaita/kk"
        value={input.newPatientsPerMonth}
        handleChange={(e) =>
          handleInputChange("newPatientsPerMonth", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
