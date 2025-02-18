import * as React from "react";
import { Container, Box, Typography, TextField } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from "@mui/material";

export default function InputBlockAccordion(props) {
  return (
    <Accordion>
      <AccordionSummary>{props.blockTitle}</AccordionSummary>
      <AccordionDetails></AccordionDetails>
      <AccordionActions></AccordionActions>
    </Accordion>
  );
}
