
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

    const chartData = {
        labels: Array.from({ length: Math.max(...scenarios.map(s => s.data.length)) }, (_, i) => i + 1),
        datasets: scenarios.flatMap((scenario, index) => [
            {
                label: `Invested – ${scenario.label}`,
                data: scenario.data.map((entry) => entry.totalInvested),
                borderColor: index === 0 ? "#0d6efd" : "#6610f2",
                backgroundColor: index === 0 ? "#0d6efd44" : "#6610f244",
                tension: 0.2,
            },
            {
                label: `Total Value – ${scenario.label}`,
                data: scenario.data.map((entry) => entry.totalValue),
                borderColor: index === 0 ? "#198754" : "#dc3545",
                backgroundColor: index === 0 ? "#19875444" : "#dc354544",
                tension: 0.2,
            },
        ]),
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Investment Growth Comparison",
            },
        },
    };

    return (
        <Card>
            <Card.Body>
                <Line data={chartData} options={options} />
            </Card.Body>
        </Card>
    );
};

export default ResultsChart;
