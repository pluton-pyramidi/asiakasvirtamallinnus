import * as React from "react";
import { Container, Box, Typography, TextField, Input } from "@mui/material";
import QueueInput from "../components/QueueInput";

export default function Simulation() {
  return (
    <Container id="simulation-container">
      <QueueInput></QueueInput>
    </Container>
  );
}
