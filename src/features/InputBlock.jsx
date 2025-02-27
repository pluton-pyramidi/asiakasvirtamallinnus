import * as React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { BoxSx } from "../components/ComponentSx";
import IntegerInput from "../components/IntegerInput";

export default function InputBlock() {
  const currentView = useSelector((state) => state.view.currentView);

  return (
    <Box sx={BoxSx}>
      <Typography>Ohjeet tähän</Typography>
      <Box>
        {currentView === "view1" && (
          <Box>
            Alkutilanne{" "}
            <IntegerInput
              fieldTitle="Syötä jono"
              fieldAriaLabel="Syötä jonossa olevien potilaiden lukumäärä"
              stateId="initialQueue"
              stateSetterId="setInitialQueue"
            ></IntegerInput>
          </Box>
        )}
        {currentView === "view2" && (
          <Box>
            Ensijäsennys{" "}
            <IntegerInput
              fieldTitle="asd"
              fieldAriaLabel=""
              stateId=""
              stateSetterId=""
            ></IntegerInput>
          </Box>
        )}
        {currentView === "view3" && (
          <Box>
            Hoitoonohjaus{" "}
            <IntegerInput
              fieldTitle="asd"
              fieldAriaLabel=""
              stateId=""
              stateSetterId=""
            ></IntegerInput>
          </Box>
        )}
        {currentView === "view4" && (
          <Box>
            TAU{" "}
            <IntegerInput
              fieldTitle="asd"
              fieldAriaLabel=""
              stateId=""
              stateSetterId=""
            ></IntegerInput>
          </Box>
        )}
        {currentView === "view5" && (
          <Box>
            P1{" "}
            <IntegerInput
              fieldTitle="asd"
              fieldAriaLabel=""
              stateId=""
              stateSetterId=""
            ></IntegerInput>
          </Box>
        )}
        {currentView === "view6" && (
          <Box>
            P2{" "}
            <IntegerInput
              fieldTitle="asd"
              fieldAriaLabel=""
              stateId=""
              stateSetterId=""
            ></IntegerInput>
          </Box>
        )}
        {currentView === "view7" && (
          <Box>
            Muu{" "}
            <IntegerInput
              fieldTitle="asd"
              fieldAriaLabel=""
              stateId=""
              stateSetterId=""
            ></IntegerInput>
          </Box>
        )}
      </Box>
    </Box>
  );
}
