import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatisticCard = ({ title, value }) => (
  <Card sx={{ minWidth: 275, margin: 2 }}>
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default StatisticCard;
