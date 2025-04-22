
import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";

const GoalCalculator = () => {
    const [form, setForm] = useState({
        targetAmount: 100000,
        initialAmount: 1000,
        interestRate: 1,
        timeUnit: "months",
        capitalization: "monthly",
        mode: "calculateContribution",
        duration: 12,
        monthlyContribution: 0,
    });
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsed = ["timeUnit", "capitalization", "mode"].includes(name)
            ? value
            : Number(value);
        setForm({ ...form, [name]: parsed });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            targetAmount,
            initialAmount,
            interestRate,
            timeUnit,
            capitalization,
            mode,
            duration,
            monthlyContribution,
        } = form;

        const months = timeUnit === "years" ? duration * 12 : duration;
        const monthlyRate =
            timeUnit === "years"
                ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
                : interestRate / 100;

        const capFreqMap = { monthly: 1, bimonthly: 2, quarterly: 3, yearly: 12 };
        const capEvery = capFreqMap[capitalization] || 1;

        if (mode === "calculateContribution") {
            const fvInit = initialAmount * Math.pow(1 + monthlyRate, months);
            const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
            const requiredContribution = (targetAmount - fvInit) / factor;

            setResult({
                message: `To reach R$${targetAmount.toLocaleString()} in ${duration} ${timeUnit}, you need to invest R$${requiredContribution.toFixed(2)} per month.`,
            });
        } else {
            let fv = initialAmount;
            let n = 0;
            while (fv < targetAmount && n < months) {
                fv += monthlyContribution;
                if ((n + 1) % capEvery === 0) {
                    fv *= 1 + monthlyRate;
                }
                n++;
            }
            if (fv < targetAmount) {
                setResult({
                    message: `Goal not reached within ${months} months.`,
                });
            } else {
                setResult({
                    message: `To reach R$${targetAmount.toLocaleString()} with R$${monthlyContribution} per month, it will take approximately ${n} months (${(n / 12).toFixed(1)} years).`,
                });
            }
        }
    };

    return (
        <Card className="mb-5">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md>
                            <Form.Group>
                                <Form.Label>Target Amount (R$)</Form.Label>
                                <Form.Control type="number" name="targetAmount" value={form.targetAmount} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group>
                                <Form.Label>Initial Amount (R$)</Form.Label>
                                <Form.Control type="number" name="initialAmount" value={form.initialAmount} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md>
                            <Form.Group>
                                <Form.Label>Interest Rate (% per {form.timeUnit === "years" ? "year" : "month"})</Form.Label>
                                <Form.Control type="number" name="interestRate" value={form.interestRate} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group>
                                <Form.Label>Time Unit</Form.Label>
                                <Form.Select name="timeUnit" value={form.timeUnit} onChange={handleChange}>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md>
                            <Form.Group>
                                <Form.Label>Capitalization Frequency</Form.Label>
                                <Form.Select name="capitalization" value={form.capitalization} onChange={handleChange}>
                                    <option value="monthly">Monthly</option>
                                    <option value="bimonthly">Bimonthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group>
                                <Form.Label>Mode</Form.Label>
                                <Form.Select name="mode" value={form.mode} onChange={handleChange}>
                                    <option value="calculateContribution">Calculate Monthly Contribution</option>
                                    <option value="calculateTime">Calculate Time (needs monthly amount)</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    {form.mode === "calculateContribution" && (
                        <Row className="mb-3">
                            <Col md>
                                <Form.Group>
                                    <Form.Label>Duration ({form.timeUnit === "years" ? "years" : "months"})</Form.Label>
                                    <Form.Control type="number" name="duration" value={form.duration} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                    {form.mode === "calculateTime" && (
                        <Row className="mb-3">
                            <Col md>
                                <Form.Group>
                                    <Form.Label>Monthly Contribution (R$)</Form.Label>
                                    <Form.Control type="number" name="monthlyContribution" value={form.monthlyContribution} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                    <Button variant="primary" type="submit">Calculate</Button>
                </Form>
                {result && <Alert className="mt-4" variant="info">{result.message}</Alert>}
            </Card.Body>
        </Card>
    );
};

export default GoalCalculator;