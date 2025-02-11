import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import Simulation from "./components/Simulation";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Header></Header>
      <Simulation></Simulation>
    </Container>
  );
}
