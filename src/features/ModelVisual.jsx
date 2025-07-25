import { Box } from "@mui/material";
import { BoxSx } from "../utils/ComponentSx.jsx";
import { useRef, useState } from "react";
import { ProcessUnitDraw } from "../components/ProcessUnit.jsx";
import { useElementSize } from "../hooks/useElementSize.js";
import { D3Chart } from "../utils/D3Component.jsx";

export const ModelVisual = () => {
  const refProcessUnits = useRef(null);
  // In case we want to be able to toggle processUnits on/off at some point.
  const processUnits = [
    {
      id: "ProcessUnit",
      options: {},
      componentLoadFunction: () => Promise.resolve(Data),
      componentDrawFunction: ProcessUnitDraw,
      componentResizeFunction: ProcessUnitDraw, // If no special resize code is needed, use the draw function for both draw and resize.
    },
  ];
  const [showProcessUnit, setShowProcessUnit] = useState(processUnits.map((c) => c.id));

  const { width: processUnitWidth, height: processUnitHeight } = useElementSize(refProcessUnits);
  const [resize, setResize] = useState(false);
  const [reload, setReload] = useState(false);

  let cellWidth = 0,
    cellHeight = 0;
  if (processUnitWidth) {
    // Calculate grid dimensions based on number of visible processUnits and a reasonable target aspect ratio.
    const processUnitCount = showProcessUnit.length;
    const aspectRatio = processUnitWidth / processUnitHeight;
    const targetAspectRatio = 16 / 9;
    const normalizedAspectRatio = aspectRatio / targetAspectRatio;
    const rows = Math.max(1, Math.floor(Math.sqrt(processUnitCount / normalizedAspectRatio)));
    const cols = Math.ceil(processUnitCount / rows);
    cellWidth = processUnitWidth / cols;
    cellHeight = processUnitHeight / rows;
  }

  return (
    <Box
      ref={refProcessUnits}
      sx={{ ...BoxSx, minHeight: "400px", maxHeight: "1000px", minWidth: "300px", maxWidth: "1200px" }}
      id="-processUnit-box"
      component="section"
    >
      {processUnits.map((c) =>
        showProcessUnit.includes(c.id) ? (
          <D3Chart
            id={`processUnit-${c.id}`}
            key={c.id}
            width={cellWidth}
            height={cellHeight}
            resize={resize}
            reload={reload}
            options={c.options}
            componentLoadFunction={c.processUnitLoadFunction}
            componentDrawFunction={c.processUnitDrawFunction}
            componentResizeFunction={c.processUnitResizeFunction}
          />
        ) : null
      )}
    </Box>
  );
};
