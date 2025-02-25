import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Parameters() {
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
      <Typography>Oletukset ja parametrit</Typography>
    </Box>
  );
}
