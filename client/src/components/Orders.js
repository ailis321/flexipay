import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom'; 
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Link } from '@mui/material';
import Title from './Title';

const Orders = ({ transactions }) => {
    return (
      <React.Fragment>
        <Paper sx={{ mt: 3, mb: 2, p: 2 }}>
          <Title>Today's Transactions</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>From</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(transaction.created * 1000).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.source?.receipt_email}</TableCell> 
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell align="right">{`£${(transaction.amount / 100).toFixed(2)}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link component={RouterLink} to="/current-month" style={{ textDecoration: 'none', mt: 3 }}>
            <Typography color="primary" display="block" style={{ marginTop: '16px' }}>
              See more transactions
            </Typography>
          </Link>
        </Paper>
      </React.Fragment>
    );
  }
  
export default Orders;
