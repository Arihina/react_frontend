import React from "react";
import { useNavigate } from 'react-router-dom';


function Table({ style, transactions, onDelete }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const rowClick = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="Table">
      <table style={style}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} onClick={() => rowClick(transaction._id)} style={{ cursor: 'pointer' }}>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>
                <button style={{ backgroundColor: '#343a40', border: 'none', color: '#ffffff', borderRadius: '5px', padding: '5px 10px' }}
                  onClick={(e) => { e.stopPropagation(); onDelete(transaction._id) }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
