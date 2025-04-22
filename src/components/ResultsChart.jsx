
import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ResultsChart = ({ scenarios }) => {
    if (!scenarios || scenarios.length === 0) return null;

    const maxMonths = Math.max(...scenarios.map(s => s.data.length));
    const labels = Array.from({ length: maxMonths }, (_, i) => i + 1);

    const chartData = {
        labels,
        datasets: scenarios.flatMap((scenario, idx) => [
            {
                label: `Invested – ${scenario.label}`,
                data: scenario.data.map(d => d.totalInvested),
                borderColor: idx === 0 ? "#0d6efd" : "#6610f2",
                backgroundColor: idx === 0 ? "#0d6efd44" : "#6610f244",
                tension: 0.2,
            },
            {
                label: `Total Value – ${scenario.label}`,
                data: scenario.data.map(d => d.totalValue),
                borderColor: idx === 0 ? "#198754" : "#dc3545",
                backgroundColor: idx === 0 ? "#19875444" : "#dc354544",
                tension: 0.2,
            },
        ]),
    };

    return (
        <Card className="mb-5">
            <Card.Body>
                <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Investment Growth Comparison" } } }} />
            </Card.Body>
        </Card>
    );
};

export default ResultsChart;
