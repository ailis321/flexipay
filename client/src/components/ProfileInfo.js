import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ customer }) => {
  const navigate = useNavigate();

  const handleCreatePaymentLinkClick = () => {
    navigate('/payment-link');
  };

  return (
    <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h6">{customer.name}</Typography>
        <Box sx={{ mt: 1 }}>
          <Typography>Email: {customer.email}</Typography>
          <Typography>Phone: {customer.phone}</Typography>
          <Typography>Registered Since: {new Date(customer.dateJoined).toLocaleDateString()}</Typography>
          <Typography>Stripe Customer ID: {customer.stripeCustomerId}</Typography>
        </Box>
      </Box>
      <Button
        onClick={handleCreatePaymentLinkClick}
        variant="contained"
        size="small" 
        sx={{
          bgcolor: '#53937d',
          '&:hover': {
            bgcolor: '#417658',
          },

          padding: '6px 16px',
          fontSize: '0.8125rem',

          width: 'fit-content',
          minWidth: '0', 
          height: '36px', 
        }}
      >
        Create Payment Link
      </Button>
    </Paper>
  );
};

export default ProfileInfo;
