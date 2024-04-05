import React from 'react';
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ActivityTable = ({ activityData }) => (
  <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Recipient</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {activityData.map((activity, index) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
            <TableCell>{activity.date}</TableCell>
            <TableCell>{activity.recipient}</TableCell>
            <TableCell align="right">{activity.amount}</TableCell>
            <TableCell>{activity.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ActivityTable;
