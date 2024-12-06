import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert,Badge } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', variant: '' });
  const [loading, setLoading] = useState(true);

  // Form validation state
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    monthlyBudget: '',
    preferredCurrency: 'INR',
    notifications: true,
    bankAccounts: []
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profile');
      setProfile(response.data);
      setFormData({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        monthlyBudget: response.data.budget || '',
        preferredCurrency: response.data.currency || 'INR',
        notifications: response.data.notifications !== false,
        bankAccounts: response.data.bankAccounts || []
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setAlertInfo({
        show: true,
        message: 'Failed to load profile data',
        variant: 'danger'
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const updatedProfile = {
        ...profile,
        ...formData
      };
      
      await axios.put('http://localhost:8000/api/profile', updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setAlertInfo({
        show: true,
        message: 'Profile updated successfully!',
        variant: 'success'
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setAlertInfo({ show: false, message: '', variant: '' });
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlertInfo({
        show: true,
        message: 'Failed to update profile',
        variant: 'danger'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Profile Settings</h2>
        {!isEditing && (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {alertInfo.show && (
        <Alert variant={alertInfo.variant} dismissible 
               onClose={() => setAlertInfo({ show: false, message: '', variant: '' })}>
          {alertInfo.message}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    pattern="[0-9]{10}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid 10-digit phone number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Monthly Budget</Form.Label>
                  <Form.Control
                    type="number"
                    name="monthlyBudget"
                    value={formData.monthlyBudget}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    min="0"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid budget amount.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Currency</Form.Label>
                  <Form.Select
                    name="preferredCurrency"
                    value={formData.preferredCurrency}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Notifications</Form.Label>
                  <div>
                    <Form.Check
                      type="switch"
                      id="notification-switch"
                      name="notifications"
                      label="Enable email notifications"
                      checked={formData.notifications}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {isEditing && (
              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" onClick={() => {
                  setIsEditing(false);
                  setValidated(false);
                  fetchProfile(); // Reset form data to original values
                }}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Connected Bank Accounts Section */}
      <Card className="mt-4">
        <Card.Header>
          <h4 className="mb-0">Connected Bank Accounts</h4>
        </Card.Header>
        <Card.Body>
          {formData.bankAccounts.length > 0 ? (
            <div className="list-group">
              {formData.bankAccounts.map((account, index) => (
                <div key={index} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{account.bankName}</h6>
                      <small className="text-muted">Account ending in {account.accountNumber.slice(-4)}</small>
                    </div>
                    <Badge bg="success">Connected</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted mb-3">No bank accounts connected yet</p>
              <Button variant="outline-primary">Connect a Bank Account</Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;