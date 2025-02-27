import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../features/inputState/viewSlice";
import { Box, Button } from "@mui/material";

export default function ViewButtons() {
  const currentView = useSelector((state) => state.view.currentView);
  const dispatch = useDispatch();

  const handleButtonClick = (view) => {
    dispatch(setView(view));
  };

  return (
    <Box>
      <Button
        onClick={() => handleButtonClick("view1")}
        className={currentView === "view1" ? "active" : ""}
      >
        Alkutilanne
      </Button>
      <Button
        onClick={() => handleButtonClick("view2")}
        className={currentView === "view2" ? "active" : ""}
      >
        Ensijäsennys
      </Button>
      <Button
        onClick={() => handleButtonClick("view3")}
        className={currentView === "view3" ? "active" : ""}
      >
        Hoitoonohjaus
      </Button>
      <Button
        onClick={() => handleButtonClick("view4")}
        className={currentView === "view4" ? "active" : ""}
      >
        TAU
      </Button>
      <Button
        onClick={() => handleButtonClick("view5")}
        className={currentView === "view5" ? "active" : ""}
      >
        P1
      </Button>
      <Button
        onClick={() => handleButtonClick("view6")}
        className={currentView === "view6" ? "active" : ""}
      >
        P2
      </Button>
      <Button
        onClick={() => handleButtonClick("view7")}
        className={currentView === "view7" ? "active" : ""}
      >
        Muu
      </Button>
    </Box>
  );
}
