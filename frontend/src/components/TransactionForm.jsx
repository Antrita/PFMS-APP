import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TransactionForm = ({ show, handleClose, refreshTransactions }) => {
  const [transaction, setTransaction] = useState({
    type: 'Expense',
    account: '',
    description: '',
    category: '',
    amount: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/transactions/', transaction);
      handleClose();
      refreshTransactions();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={transaction.type}
              onChange={(e) => setTransaction({...transaction, type: e.target.value})}
            >
              <option>Expense</option>
              <option>Income</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Account</Form.Label>
            <Form.Select
              value={transaction.account}
              onChange={(e) => setTransaction({...transaction, account: e.target.value})}
            >
              <option value="">Select Account</option>
              <option>Cash</option>
              <option>SBI Bank</option>
              <option>HDFC Bank</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={transaction.description}
              onChange={(e) => setTransaction({...transaction, description: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={transaction.category}
              onChange={(e) => setTransaction({...transaction, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option value="travel">Travel</option>
              <option value="bills">Bills</option>
              <option value="groceries">Groceries</option>
              <option value="education">Education</option>
              <option value="leisure">Leisure</option>
              <option value="emi">EMI</option>
              <option value="mobile">Mobile Recharge</option>
              <option value="health">Health</option>
              <option value="shopping">Shopping</option>
              <option value="misc">Miscellaneous</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={transaction.amount}
              onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default TransactionForm;