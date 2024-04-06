import React from 'react';

const PaymentsTable = ({ transactions, type }) => {

  const isCharge = type === 'charge';
  const title = isCharge ? 'Payments Received' : 'Payments Out';

  return (
    <div className="mt-4">
      <h2>{title}</h2>
        {transactions.length === 0 && <p>No transactions found.</p>}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Date</th>
              {isCharge && <th>From</th>}
              <th>Amount</th>
              {isCharge && <th>Stripe Fee</th>}
              {isCharge && <th>Net</th>}
              <th>Status</th>
              <th>Description</th>
              {isCharge && <th>Receipt URL</th>}
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{new Date(transaction.created * 1000).toLocaleDateString()}</td>
                {isCharge && <td>{transaction.source.receipt_email}</td>}
                <td>£{transaction.amount / 100}</td>
                {isCharge && <td>£{transaction.fee / 100}</td>}
                {isCharge && <td>£{(transaction.amount - transaction.fee) / 100}</td>}
                <td>{transaction.status}</td>
                <td>{transaction.description}</td>
                {isCharge && <td><a href={transaction.source.receipt_url} target="_blank" rel="noreferrer">View Receipt</a></td>}
                <td>{transaction.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTable;
