import * as React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { calculateSimulationBalance } from "./balanceSlice";

export default function RunSimulation() {
  const dispatch = useDispatch();

  const handleRunSimulation = () => {
    dispatch(calculateSimulationBalance());
  };

  return <Button onClick={handleRunSimulation}>Run</Button>;
}
