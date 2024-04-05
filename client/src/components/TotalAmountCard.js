// TotalAmountCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TotalAmountCard = ({ title, amount }) => (
  <Card sx={{ minWidth: 275, margin: 2 }}>
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        £{amount.toFixed(2)} GBP
      </Typography>
    </CardContent>
  </Card>
);

export default TotalAmountCard;
