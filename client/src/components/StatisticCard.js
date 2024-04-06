import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatisticCard = ({ title, value, valueStyle }) => (
  <Card sx={{ minWidth: 275, margin: 2 }}>
    <CardContent>
      <Typography color="text.secondary" gutterBottom sx={valueStyle}>
        {title}
      </Typography>
      <Typography variant="h5" component="div" sx={valueStyle}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default StatisticCard;
