import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "./viewSlice";
import { Box, Button } from "@mui/material";

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
      >
        {viewName}
      </Button>
    </Box>
  );
}
