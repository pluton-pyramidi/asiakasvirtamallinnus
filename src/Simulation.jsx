import * as React from "react";
import { Container, Box, Typography, TextField, Input } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from "@mui/material";
import InputBlockAccordion from "./InputBlockAccordion";
import { ResultsChart } from "./ResultsChart";

export default function Simulation() {
  return (
    <Container id="simulation-container">
      <InputBlockAccordion blockTitle="Alkutilanne"></InputBlockAccordion>
      <InputBlockAccordion blockTitle="Ensijäsennys"></InputBlockAccordion>
      <InputBlockAccordion blockTitle="Hoitoonohjaus-%-osuudet"></InputBlockAccordion>
      <InputBlockAccordion blockTitle="Tavanomainen hoito"></InputBlockAccordion>
      <InputBlockAccordion blockTitle="1. porras: Ohjattu omahoito"></InputBlockAccordion>
      <InputBlockAccordion blockTitle="2. porras: Kognitiivinen lyhytterapia/IPC"></InputBlockAccordion>
      <ResultsChart></ResultsChart>
    </Container>
  );
}
