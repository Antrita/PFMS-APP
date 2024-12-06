import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import CategoryIcon from './CategoryIcons';

const TransactionList = ({ transactions }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>{transaction.description}</td>
            <td>
              <div className="d-flex align-items-center gap-2">
                <CategoryIcon category={transaction.category} />
                <span>{transaction.category}</span>
              </div>
            </td>
            <td>₹{transaction.amount}</td>
            <td>
              <Badge bg={transaction.type === 'Income' ? 'success' : 'danger'}>
                {transaction.type}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionList;