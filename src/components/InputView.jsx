import * as React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

export default function InputView({ children }) {
  const currentView = useSelector((state) => state.view.currentView);

  return (
    <Box>
      {currentView === "view1" && (
        <Box>
          Alkutilanne
          {children}
        </Box>
      )}
      {currentView === "view2" && (
        <Box>
          Ensijäsennys
          {children}
        </Box>
      )}
      {currentView === "view3" && (
        <Box>
          Hoitoonohjaus
          {children}
        </Box>
      )}
      {currentView === "view4" && (
        <Box>
          TAU
          {children}
        </Box>
      )}
      {currentView === "view5" && (
        <Box>
          P1
          {children}
        </Box>
      )}
      {currentView === "view6" && (
        <Box>
          P2
          {children}
        </Box>
      )}
      {currentView === "view7" && (
        <Box>
          Muu
          {children}
        </Box>
      )}
    </Box>
  );
}
