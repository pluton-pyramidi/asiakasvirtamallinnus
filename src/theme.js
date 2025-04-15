import { createTheme } from "@mui/material/styles";
import { grey, blueGrey, cyan, red } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // very dark gray background
      paper: "#1e1e1e", // slightly lighter for cards/surfaces
    },
    primary: {
      main: cyan[400], // cool accent color
    },
    secondary: {
      main: blueGrey[500], // a neutral secondary for contrast
    },
    error: {
      main: red.A400, // keeping this for alerts
    },
    text: {
      primary: "#ffffff",
      secondary: grey[400],
    },
    divider: grey[700],
  },
});

export default theme;
