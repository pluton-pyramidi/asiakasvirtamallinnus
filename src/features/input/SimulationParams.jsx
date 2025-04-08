import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import { Box, Button, Typography } from "@mui/material";
import { setSimulationParams } from "./simulationParamsSlice";

// This feature renders the set of input fields and submit button for inputting/changing the Ensijäsennys parameter variables in the Ensijäsennys state slice
export default function SimulationParams() {
  const simulationParams = useSelector((state) => state.simulationParams);
  const dispatch = useDispatch();
  const [input, setInput] = useState(simulationParams);

  // handleInputChange manages the local state ("input") visible in the input fields.
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  // handleSubmit on the other hand manages the dispatch of the same state values to the Redux state store
  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setSimulationParams(input));
  };

  return (
    <Box>
      <NumberInput
        label="Ammattilaisen työaika (h/päivä):"
        value={input.workingHoursDaily}
        handleChange={(e) =>
          handleInputChange("workingHoursDaily", Number(e.target.value))
        }
      />
      <NumberInput
        label="Mallinnuksen aikasykli (kk):"
        value={input.cycleDuration}
        handleChange={(e) =>
          handleInputChange("cycleDuration", Number(e.target.value))
        }
      />
      <NumberInput
        label="Mallinnettu ajanjakso (kk):"
        value={input.simulationTimeSpan}
        handleChange={(e) =>
          handleInputChange("simulationTimeSpan", Number(e.target.value))
        }
      />
      <NumberInput
        label="Hoitojakson kesto, tavanomainen hoito (kk):"
        value={input.treatmentDurationTau}
        handleChange={(e) =>
          handleInputChange("treatmentDurationTau", Number(e.target.value))
        }
      />
      <NumberInput
        label="Hoitojakson kesto, ensimmäinen porras (kk):"
        value={input.treatmentDurationStepOne}
        handleChange={(e) =>
          handleInputChange("treatmentDurationStepOne", Number(e.target.value))
        }
      />
      <NumberInput
        label="Hoitojakson kesto, toinen porras (kk):"
        value={input.treatmentDurationStepTwo}
        handleChange={(e) =>
          handleInputChange("treatmentDurationStepTwo", Number(e.target.value))
        }
      />

      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
