import * as React from "react";
import Container from "@mui/material/Container";
import Header from "./features/Header";
import Simulation from "./features/Simulation";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Header></Header>
      <Simulation></Simulation>
    </Container>
  );
}
