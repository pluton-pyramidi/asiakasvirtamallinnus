import * as React from "react";
import { Box, Typography } from "@mui/material";
import { BoxSx } from "../utils/ComponentSx";
import { useSelector } from "react-redux";

export default function ResultsNumbers2() {
  const simulatedQueue = useSelector((state) => state.balance.queueArray);
  const balanceIn = useSelector((state) => state.balance.balanceIn);
  const balanceOut = useSelector((state) => state.balance.balanceOut);

  const headers = [
    "New Patients Joining Queue",
    "Patients Return to Queue TAU",
    "Patients Return to Queue Step One",
    "Patients Return to Queue Step Two",
    "Patients Return to Queue Muu",
    "Patients Joining Total",
    "Patients Leaving Queue TAU",
    "Patients Leaving Queue Step One",
    "Patients Leaving Queue Step Two",
    "Patients Leaving Queue Muu",
    "Patients Leaving Queue Total",
    "Simulated Queue",
  ];

  const data = [
    balanceIn.newPatientsJoiningQueue,
    balanceIn.patientsReturningFromTau,
    balanceIn.patientsReturningFromStepOne,
    balanceIn.patientsReturningFromStepTwo,
    balanceIn.patientsReturningFromMuu,
    balanceIn.patientsJoiningTotal,
    balanceOut.patientsLeavingFromTau,
    balanceOut.patientsLeavingFromStepOne,
    balanceOut.patientsLeavingFromStepTwo,
    balanceOut.patientsLeavingFromMuu,
    balanceOut.patientsLeavingTotal,
    simulatedQueue,
  ];

  const renderTableRows = () => {
    return headers.map((header, rowIndex) => (
      <tr key={rowIndex}>
        <td style={{ border: "1px solid grey", padding: "8px" }}>
          <strong>{header}</strong>
        </td>
        {data[rowIndex]?.map((value, colIndex) => (
          <td key={colIndex} style={{ border: "1px solid grey", padding: "8px" }}>
            {value}
          </td>
        ))}
      </tr>
    ));
  };

  const renderTable = () => {
    if (!simulatedQueue.length) {
      return <Typography>No data available</Typography>;
    }

    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid grey" }}></th>
            {simulatedQueue.map((_, index) => (
              <th key={index} style={{ border: "1px solid grey" }}>
                Month {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    );
  };

  return (
    <Box sx={BoxSx}>
      <Typography variant="h5" component="h2" align="center">
        Tase
      </Typography>
      {renderTable()}
    </Box>
  );
}
