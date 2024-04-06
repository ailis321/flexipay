import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TotalAmountCard = ({ title, amount }) => {
  // Ensure that amount is a number
  const displayAmount = typeof amount === 'number' ? amount.toFixed(2) : '0.00';

  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          £{displayAmount} GBP
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalAmountCard;
