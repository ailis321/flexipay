// ProfileInfo.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ProfileInfo = ({ customer }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{customer.name}</Typography>
      <Box sx={{ mt: 1 }}>
        <Typography>Email: {customer.email}</Typography>
        <Typography>Phone: {customer.phone}</Typography>
        <Typography>Registered Since: {new Date(customer.dateJoined).toLocaleDateString()}</Typography>
        <Typography>Stripe Customer ID: {customer.stripeCustomerId}</Typography>
      
      </Box>
    </Paper>
  );
};

export default ProfileInfo;
