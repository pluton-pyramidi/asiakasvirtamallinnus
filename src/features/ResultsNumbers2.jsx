import * as React from "react";
import { Box, Typography } from "@mui/material";
import { BoxSx } from "../utils/ComponentSx";
import { useSelector } from "react-redux";

export default function ResultsNumbers2() {
  const simulatedQueue = useSelector((state) => state.balance.value);
  const balanceIn = useSelector((state) => state.balance.balanceIn);
  const balanceOut = useSelector((state) => state.balance.balanceOut);
  const newPatientsJoiningQueue = balanceIn[0];
  const patientsReturningFromTau = balanceIn[1];
  const patientsReturningFromStepOne = balanceIn[2];
  const patientsReturningFromStepTwo = balanceIn[3];
  const patientsReturningFromMuu = balanceIn[4];
  const patientsJoiningTotal = balanceIn[5];

  // Render the simulatedQueue and the arrays contained in balanceIn and balanceOut in a table format
  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Simulated Queue</th>
            <th>Balance In</th>
            <th>Balance Out</th>
          </tr>
        </thead>
        <tbody>
          {simulatedQueue.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value}</td>
              <td>{balanceIn[index]}</td>
              <td>{balanceOut[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Box sx={BoxSx}>
      <Typography variant="h5" component="h2" align="center">
        Tase
      </Typography>

      {/* Render the results table */}
      {renderTable()}

      {/* Render the simulated queue */}
      <Typography variant="h6" component="h3" align="center">
        Simulated Queue:
      </Typography>
      <Box>
        {simulatedQueue.map((value, index) => (
          <Typography key={index}>
            Month {index + 1}: {value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
