
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InvestmentForm from "../components/InvestmentForm";
import ResultsChart from "../components/ResultsChart";
import { calculateCompoundInterest } from "../utils/calculator";

const InvestmentPage = () => {
  const [forms, setForms] = useState([
    {
      id: Date.now(),
      inputs: {
        initialAmount: 1000,
        monthlyContribution: 100,
        duration: 12,
        interestRate: 1,
        interestType: "compound",
        timeUnit: "months",
        capitalization: "monthly",
      },
    },
  ]);
  const [scenarios, setScenarios] = useState([]);

  const addForm = () => {
    if (forms.length >= 5) return;
    const newId = Date.now() + Math.random();
    setForms([
      ...forms,
      {
        id: newId,
        inputs: {
          initialAmount: 1000,
          monthlyContribution: 100,
          duration: 12,
          interestRate: 1,
          interestType: "compound",
          timeUnit: "months",
          capitalization: "monthly",
        },
      },
    ]);
  };

  const removeForm = (id) => {
    setForms(forms.filter((f) => f.id !== id));
    setScenarios(scenarios.filter((s) => s.id !== id));
  };

  const handleCalculate = (inputs, id) => {
    const data = calculateCompoundInterest(inputs);
    const typeLabel = inputs.interestType === "simple" ? "Simple" : "Compound";
    const label = `Scenario (${typeLabel})`;
    setScenarios((prev) => {
      const others = prev.filter((s) => s.id !== id);
      return [...others, { id, data, label }];
    });
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Investment Simulator</h1>
      {forms.map((form) => (
        <InvestmentForm
          key={form.id}
          id={form.id}
          defaultValues={form.inputs}
          onCalculate={handleCalculate}
          onRemove={removeForm}
        />
      ))}
      {forms.length < 5 && (
        <div className="d-flex justify-content-center mb-4">
          <Button
            onClick={addForm}
            variant="success"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
            title="Add simulation"
          >
            +
          </Button>
        </div>
      )}
      {scenarios.length > 0 && <ResultsChart scenarios={scenarios} />}
    </Container>
);
};

export default InvestmentPage;
