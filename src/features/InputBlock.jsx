import * as React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { BoxSx } from "../components/ComponentSx";
import IntegerInput from "./inputInteger/IntegerInput";

export default function InputBlock() {
  const currentView = useSelector((state) => state.view.currentView);

  return (
    <Box sx={BoxSx}>
      <Typography>Ohjeet tähän</Typography>
      <Box>
        {currentView === "alkutilanne" && (
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
        {currentView === "ensijasennys" && (
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
        {currentView === "hoitoonohjaus" && (
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
        {currentView === "tau" && (
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
        {currentView === "p1" && (
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
        {currentView === "p2" && (
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
        {currentView === "muu" && (
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
