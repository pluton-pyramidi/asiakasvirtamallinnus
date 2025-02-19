import * as React from "react";
import Container from "@mui/material/Container";
import Header from "./features/Header";
import Simulation from "./features/Simulation";
import Counter from "./features/counter/Counter";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Header></Header>
      <Counter />
      <Simulation></Simulation>
    </Container>
  );
}
