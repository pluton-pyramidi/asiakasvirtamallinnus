import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <Box id="header-box" component="section">
      <Typography
        id="app-main-title"
        variant="h2"
        component="h1"
        align="center"
      >
        Asiakasvirtamallinnus
      </Typography>
    </Box>
  );
}
