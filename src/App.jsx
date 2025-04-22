
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InvestmentPage from "./pages/InvestmentPage";
import GoalPage from "./pages/GoalPage";

const App = () => (
  <Router>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Investment App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">Investments</Nav.Link>
            <Nav.Link as={Link} to="/goal">Goal</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<InvestmentPage />} />
      <Route path="/goal" element={<GoalPage />} />
    </Routes>
  </Router>
);

export default App;
