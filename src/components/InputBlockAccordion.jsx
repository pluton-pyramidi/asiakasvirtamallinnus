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
      <AccordionDetails>
        <Typography variant="h5" component="h2" align="center">
          Syötä jonotilanne:
        </Typography>
      </AccordionDetails>
      <AccordionActions></AccordionActions>
    </Accordion>
  );
}
