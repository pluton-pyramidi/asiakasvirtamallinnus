import * as React from "react";
import { Box, Typography } from "@mui/material";
import { BoxSx } from "../utils/ComponentSx";
import { useSelector } from "react-redux";

export default function ResultsNumbers() {
  const simulatedQueue = useSelector((state) => state.balance.value);
  const resultsTable = useSelector((state) => state.balance.resultsTable);

  return (
    <Box sx={BoxSx}>
      <Typography variant="h5" component="h2" align="center">
        Tulokset lukuina
      </Typography>

      {/* Render the results table */}
      <Typography variant="h6" component="h3" align="center">
        Results Table:
      </Typography>
      <Box>
        {resultsTable.map((row, index) => (
          <Typography key={index}>
            {row.name} {row.value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
