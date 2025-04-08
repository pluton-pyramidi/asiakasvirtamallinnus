import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import { Box, Button, Typography } from "@mui/material";
import { setSimulationParams } from "./simulationParamsSlice";
import { handleSubmitAndRun } from "../../utils/handleSubmitAndRun";

// This feature renders the set of input fields and submit button for inputting/changing the Ensijäsennys parameter variables in the Ensijäsennys state slice
export default function SimulationParams() {
  const simulationParams = useSelector((state) => state.simulationParams);
  const dispatch = useDispatch();
  const [input, setInput] = useState(simulationParams);
  const setAction = setSimulationParams;

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
