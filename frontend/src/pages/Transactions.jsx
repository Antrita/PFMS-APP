import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import CategoryIcon from '../components/CategoryIcons';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/transactions/');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const categories = [
    'travel', 'bills', 'groceries', 'education', 'leisure',
    'emi', 'mobile', 'health', 'shopping', 'misc', 'new'
  ];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Transactions</h2>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Add Transaction
        </Button>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline-secondary"
            className="d-flex align-items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <CategoryIcon category={category} />
            <span>{category}</span>
          </Button>
        ))}
      </div>

      <TransactionList transactions={transactions} />
      
      <TransactionForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        refreshTransactions={fetchTransactions}
      />
    </div>
  );
};

export default Transactions;