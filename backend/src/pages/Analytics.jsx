// src/pages/Analytics.jsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    total_spent: 0,
    budget_remaining: 0,
    top_categories: []
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/analytics/summary');
      setAnalytics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">Analytics</h2>
      
      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Spent</Card.Title>
              <h3>₹{analytics.total_spent.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Budget Remaining</Card.Title>
              <h3>₹{analytics.budget_remaining.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Spending Overview</Card.Title>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={analytics.top_categories}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      label={({ name, percent }) => 
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {analytics.top_categories.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Category Breakdown</Card.Title>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={analytics.top_categories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis 
                      tickFormatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      formatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="amount" 
                      fill="#8884d8"
                      name="Spent Amount"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;