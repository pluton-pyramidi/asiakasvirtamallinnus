import * as React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { BoxSx } from "../customStyles/ComponentSx";
import IntegerInput from "./input/IntegerInput";

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
              fieldLabel="Syötä jono"
              stateId="initialQueue"
            ></IntegerInput>
            <IntegerInput
              fieldLabel="Uusia potilaita/kk"
              stateId="newPatientsMonthly"
            ></IntegerInput>
          </Box>
        )}
        {currentView === "ensijasennys" && (
          <Box>
            Ensijäsennys{" "}
            <IntegerInput fieldLabel="asd" stateId=""></IntegerInput>
          </Box>
        )}
        {currentView === "hoitoonohjaus" && (
          <Box>
            Hoitoonohjaus{" "}
            <IntegerInput fieldLabel="asd" stateId=""></IntegerInput>
          </Box>
        )}
        {currentView === "tau" && (
          <Box>
            TAU <IntegerInput fieldLabel="asd" stateId=""></IntegerInput>
          </Box>
        )}
        {currentView === "p1" && (
          <Box>
            P1 <IntegerInput fieldLabel="asd" stateId=""></IntegerInput>
          </Box>
        )}
        {currentView === "p2" && (
          <Box>
            P2 <IntegerInput fieldLabel="asd" stateId=""></IntegerInput>
          </Box>
        )}
        {currentView === "muu" && (
          <Box>
            Muu <IntegerInput fieldLabel="asd" stateId=""></IntegerInput>
          </Box>
        )}
      </Box>
    </Box>
  );
}
