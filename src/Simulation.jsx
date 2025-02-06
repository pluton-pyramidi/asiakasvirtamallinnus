import * as React from "react";
import { Container, Box, Typography, TextField } from "@mui/material";

export default function Simulation() {
  return (
    <Container id="simulation-container">
      <Box id="initial-queue-input-box">
        <Typography variant="h5" component="h2" align="center">
          Syötä jonotilanne!
        </Typography>
      </Box>
    </Container>
  );
}
