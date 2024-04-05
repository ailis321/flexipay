// ProfilePaymentHistory.js
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

const ProfilePaymentHistory = ({ paymentHistory }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ p: 2 }}>
        Payment History
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="payment history table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Received</TableCell>
            <TableCell align="right" sx={{ color: 'red' }}>
              Awaiting Payment
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {paymentHistory
          .filter(payment => payment.status !== 'canceled') // Exclude canceled payments
         .map((payment, index) => (
        <TableRow key={index}>
        <TableCell component="th" scope="row">
          {new Date(payment.created * 1000).toLocaleDateString()}
        </TableCell>
        <TableCell 
          align="right" 
          sx={{ 
            color: payment.status === 'succeeded' ? 'green' : 'inherit' 
          }}
        >
          {payment.status === 'succeeded' ? `£${(payment.amount / 100).toFixed(2)}` : ''}
        </TableCell>
        <TableCell 
          align="right" 
          sx={{ 
            color: ['requires_payment_method', 'requires_confirmation'].includes(payment.status) ? 'red' : 'inherit' 
          }}
        >
          {['requires_payment_method', 'requires_confirmation'].includes(payment.status) ? `£${(payment.amount / 100).toFixed(2)}` : ''}
        </TableCell>
      </TableRow>
    ))}
    </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfilePaymentHistory;
