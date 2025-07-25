import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { replaceComponent } from "./D3ComponentHelpers";

// D3Component
// This helper component supports components that provide load, draw and resize functions.
// If no special resize code is needed, use the draw function for both draw and resize.
export const D3Component = (props) => {
  const { id, width, height, resize, options, componentLoadFunction, componentDrawFunction, componentResizeFunction } =
    props;

  const [componentData, setComponentData] = useState(undefined);

  useEffect(() => {
    // This useEffect runs on component mount and whenever componentLoadFunction changes.
    let isMounted = true;
    componentLoadFunction().then((data) => {
      if (isMounted) setComponentData(data);
    });
    return () => {
      isMounted = false;
    };
  }, [componentLoadFunction]);

  // This second useEffect runs on component mount and whenever componentData or w/h change.
  // Use it to resize or draw the component as needed.
  // The App parent component sets a resize prop to help us decide.
  useEffect(() => {
    // We need daddy before we can render.  Also componentData.
    const divComponent = document.getElementById(id);
    if (divComponent && componentData) {
      const drawComponent = async (divComponent) => {
        if (resize) {
          const componentSvg = await componentResizeFunction(componentData, { ...options, width, height });
          replaceComponent(divComponent, componentSvg);
        } else {
          const componentSvg = await componentDrawFunction(componentData, { ...options, width, height });
          replaceComponent(divComponent, componentSvg);
        }
      };
      drawComponent(divComponent, componentData);
    }
  }, [componentData, width, height]);

  return <Box className="d3Component" id={id}></Box>;
};
