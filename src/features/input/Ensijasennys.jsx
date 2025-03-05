import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button } from "@mui/material";
import { setEnsijasennys } from "./ensijasennysSlice";

export default function Ensijasennys() {
  const ensijasennys = useSelector((state) => state.ensijasennys);
  const dispatch = useDispatch();
  const [input, setInput] = useState(ensijasennys);

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
        label="Tekijöitä"
        value={input.laborEnsijasennys}
        handleChange={(e) =>
          handleInputChange("laborEnsijasennys", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Työaika-%"
        value={input.laborPercentageEnsijasennys}
        handleChange={(e) =>
          handleInputChange(
            "laborPercentageEnsijasennys",
            Number(e.target.value)
          )
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
