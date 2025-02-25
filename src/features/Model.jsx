import * as React from "react";
import { Box, Button } from "@mui/material";

export default function Model() {
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
      <Button></Button>
    </Box>
  );
}
