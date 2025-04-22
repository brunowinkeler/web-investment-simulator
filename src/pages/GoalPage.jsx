
import React from "react";
import Container from "react-bootstrap/Container";
import GoalCalculator from "../components/GoalCalculator";

const GoalPage = () => (
  <Container className="py-5">
    <h1 className="mb-4 text-center">Goal Simulator</h1>
    <GoalCalculator />
  </Container>
);

export default GoalPage;
