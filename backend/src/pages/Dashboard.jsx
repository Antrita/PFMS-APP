import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/dashboard/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Balance</Card.Title>
              <Card.Text className="h2">₹{summary.total_balance}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Monthly Spend</Card.Title>
              <Card.Text className="h2">₹{summary.monthly_spend}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Monthly Income</Card.Title>
              <Card.Text className="h2">₹{summary.monthly_income}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card>
        <Card.Body>
          <Card.Title>Recent Transactions</Card.Title>
          <TransactionList transactions={summary.recent_transactions} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;