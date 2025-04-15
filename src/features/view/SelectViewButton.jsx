import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "./viewSlice";
import { Box, Button } from "@mui/material";

// This component returns a button which controls the view state, to select which set of values is displayed for inputting/changing values
export default function SelectViewButton({ viewName, viewId }) {
  const currentView = useSelector((state) => state.view.currentView);
  const dispatch = useDispatch();

  const handleButtonClick = (view) => {
    dispatch(setView(view));
  };

  return (
    <Box>
      <Button
        onClick={() => handleButtonClick(viewId)}
        className={currentView === viewId ? "active" : ""}
        style={currentView === viewId ? { backgroundColor: "gray" } : {}}
      >
        {viewName}
      </Button>
    </Box>
  );
}
