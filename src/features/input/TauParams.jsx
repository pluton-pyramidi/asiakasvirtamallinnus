import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "../../components/NumberInput";
import PercentageInput from "../../components/PercentageInput";
import { Box, Button, Typography } from "@mui/material";
import { setTau } from "./tauSlice";
import {
  calculateInsufficencyRateTau,
  calculateTauToQueueRate,
} from "./tauSlice";

export default function TauParams() {
  const tau = useSelector((state) => state.tau);
  const insufficiencyRateTau = useSelector(calculateInsufficencyRateTau);
  const tauToQueueRate = useSelector(calculateTauToQueueRate);
  const dispatch = useDispatch();
  const [input, setInput] = useState(tau);

  // handleInputChange manages the local state ("input") visible in the input fields.
  const handleInputChange = (field, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Dispatching input state:", input);
    dispatch(setTau(input));
  };

  return (
    <Box>
      <PercentageInput
        label="Hoito riittävää (ei jatkohoidon tarvetta) per kuukausi"
        value={input.sufficiencyRateTau}
        handleChange={(e) =>
          handleInputChange("sufficiencyRateTau", Number(e.target.value))
        }
      />
      <Typography>
        Hoito ei riitä (jatkohoidon tarve) per kuukausi:{" "}
        {Math.round(insufficiencyRateTau * 100)} %
      </Typography>
      <PercentageInput
        label="Jatkohoito: Ohjataan muuhun hoitoon per kuukausi"
        value={input.tauToMuuRate}
        handleChange={(e) =>
          handleInputChange("tauToMuuRate", Number(e.target.value))
        }
      />
      <Typography>
        Jatkohoito: Asiakas palaa suoraan takaisin jonoon per kuukausi:{" "}
        {Math.round(tauToQueueRate * 100)} %
      </Typography>
      <NumberInput
        label="Tapaamisen keskimääräinen kesto sis. valmistautumisen ja kirjaukset (min)"
        value={input.meetingDurationTau}
        handleChange={(e) =>
          handleInputChange("meetingDurationTau", Number(e.target.value))
        }
      />
      <PercentageInput
        label="Työajankäytön tehokkuus-%"
        value={input.laborEfficiencyTau}
        handleChange={(e) =>
          handleInputChange("laborEfficiencyTau", Number(e.target.value))
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
