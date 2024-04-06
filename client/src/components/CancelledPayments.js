import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

const CancelledPayments = ({ cancelledPayments }) => {

    if (cancelledPayments.length === 0) {
        return (
          <Paper sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6" gutterBottom component="div" sx={{ p: 2 }}>
            Cancelled Payments
            </Typography>
            <Typography sx={{ p: 2 }}>
              No cancelled payments.
            </Typography>
          </Paper>
        );
      }
  return (
    <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ p: 2 }}>
        Cancelled Payments
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="canceled payments table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Date Cancelled</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cancelledPayments.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(payment.created * 1000).toLocaleDateString()}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell align="right">£{(payment.amount / 100).toFixed(2)}</TableCell>
              <TableCell align="right">{payment.canceled_at ? new Date(payment.canceled_at * 1000).toLocaleDateString() : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CancelledPayments;
