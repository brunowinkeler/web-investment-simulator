import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

const InvestmentForm = ({
    id,
    defaultValues,
    onCalculate,
    onRemove,
}) => {
    // Local form state
    const [form, setForm] = useState({ ...defaultValues });

    // Handle input changes, keep strings for select fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsed = name === "interestType" || name === "timeUnit"
            ? value
            : Number(value);
        setForm({ ...form, [name]: parsed });
    };

    // Submit handler passes form + id back to App
    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(form, id);
    };

    return (
        <Card className="mb-4 position-relative">
            {/* Delete button top‑right */}
            <Button
                variant="outline-danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => onRemove(id)}
                title="Delete this simulation"
            >
                🗑️
            </Button>

            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md>
                            <Form.Group>
                                <Form.Label>Initial Amount (R$)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="initialAmount"
                                    value={form.initialAmount}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group>
                                <Form.Label>Monthly Contribution (R$)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="monthlyContribution"
                                    value={form.monthlyContribution}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md>
                            <Form.Group>
                                <Form.Label>
                                    Duration ({form.timeUnit === "years" ? "years" : "months"})
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group>
                                <Form.Label>
                                    Interest Rate (% per {form.timeUnit === "years" ? "year" : "month"})
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="interestRate"
                                    value={form.interestRate}
                                    onChange={handleChange}
                                    step="0.01"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md>
                            <Form.Group>
                                <Form.Label>Interest Type</Form.Label>
                                <Form.Select
                                    name="interestType"
                                    value={form.interestType}
                                    onChange={handleChange}
                                >
                                    <option value="compound">Compound</option>
                                    <option value="simple">Simple</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group>
                                <Form.Label>Time Unit</Form.Label>
                                <Form.Select
                                    name="timeUnit"
                                    value={form.timeUnit}
                                    onChange={handleChange}
                                >
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                        Simulate
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default InvestmentForm;
