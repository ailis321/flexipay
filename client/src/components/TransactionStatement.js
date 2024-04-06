import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TransactionStatement = ({ transactions, timeRange }) => {
  
    //Sorting transactions by date in ascending order for the balance calculation
  const sortedTransactions = transactions.sort((a, b) => a.created - b.created);

  //calculate starting balance based on date range provided
  let startingBalance = sortedTransactions.reduce((acc, transaction) => {
    const transactionDate = new Date(transaction.created * 1000);
    if (transactionDate < timeRange.start) {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  // Filter transactions based on the provided time range
  const filteredTransactions = sortedTransactions.filter(transaction => {
    const transactionDate = new Date(transaction.created * 1000);
    return transactionDate >= timeRange.start && transactionDate <= timeRange.end;
  });

  // Calculate the running balance for the filtered transactions
  let runningBalance = startingBalance;
  const transactionsWithRunningBalance = filteredTransactions.map(transaction => {
    runningBalance += transaction.amount;
    return { ...transaction, runningBalance };
  }).reverse(); //shows most recent first

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="transaction table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Payments In</TableCell>
            <TableCell align="right">Payments Out</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsWithRunningBalance.map((transaction, index) => {
            const isCharge = transaction.type === 'charge';
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {new Date(transaction.created * 1000).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  {isCharge ? `£${(transaction.amount / 100).toFixed(2)}` : '—'}
                </TableCell>
                <TableCell align="right">
                  {!isCharge ? `£${(-transaction.amount / 100).toFixed(2)}` : '—'}
                </TableCell>
                <TableCell align="right">
                  {transaction.description}
                </TableCell>
                <TableCell align="right">
                  {transaction.source.receipt_email}
                </TableCell>
                <TableCell align="right">
                  {`£${(transaction.runningBalance / 100).toFixed(2)}`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionStatement;
