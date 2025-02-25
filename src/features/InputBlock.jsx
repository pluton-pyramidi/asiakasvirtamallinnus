import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import QueueInput from "../components/QueueInput";

export default function InputBlock() {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        p: 1,
        m: 1,
        borderRadius: 1,
        border: 1,
        bgcolor: "primary.main",
      }}
    >
      <Typography>Ohjeet tähän</Typography>
      <QueueInput></QueueInput>
    </Box>
  );
}
