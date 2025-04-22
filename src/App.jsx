
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import InvestmentForm from "./components/InvestmentForm";
import ResultsChart from "./components/ResultsChart";
import { calculateCompoundInterest } from "./utils/calculator";

const App = () => {
    const [scenarios, setScenarios] = useState([]);

    const handleScenarioCalculate = (inputs, index) => {
        const result = calculateCompoundInterest(inputs);
        const updated = [...scenarios];
        updated[index] = {
            data: result,
            label: `Scenario ${index + 1} (${inputs.interestType === "simple" ? "Simple" : "Compound"})`,
        };
        setScenarios(updated);
    };

    return (
        <Container className="py-5">
            <h1 className="mb-4 text-center">Investment Simulator</h1>
            <InvestmentForm onCalculate={(inputs) => handleScenarioCalculate(inputs, 0)} />
            <InvestmentForm onCalculate={(inputs) => handleScenarioCalculate(inputs, 1)} />
            {scenarios.length > 0 && <ResultsChart scenarios={scenarios} />}
        </Container>
    );
};

export default App;
