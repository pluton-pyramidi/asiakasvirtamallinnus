import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function InputBlock(props) {
  return (
    <Box>
      <Typography>Ohjeet</Typography>
      <TextField label={props.label}></TextField>
      <TextField label={props.label}></TextField>
    </Box>
  );
}
