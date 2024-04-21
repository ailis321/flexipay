import React from 'react';
import { Typography, Divider, Paper, Grid, Box } from '@mui/material';

const Preferences = ({ preferences }) => {
  // Exclude certain keys from being displayed
  const excludedKeys = new Set(["_id", "stripeAccountId", "__v", "createdAt", "updatedAt"]);

  // Custom formatting for specific keys
  const formatValue = (key, value) => {
    if (key === 'typeOfPaymentsToReceive') {
      return value.join(', '); // Convert array to string list
    } else if (key === 'colour') {
      return (
        <Box sx={{ width: 20, height: 20, backgroundColor: value, border: '1px solid #ddd' }} />
      );

    } else if (key === 'logo') {
        //point to photo, dont show URL
        return (
            <img src={value} alt="Logo" style={{ width: 100, height: 100 }} />
        );
        }
    return value;
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Preferences
      </Typography>
      <Divider sx={{ width: '100%', mb: 2 }} />
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'white', color: '#53937d' }}>
        <Grid container spacing={2}>
          {Object.entries(preferences)
            .filter(([key]) => !excludedKeys.has(key))
            .map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </Typography>
                <Typography component="div">
                  {formatValue(key, value)}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Preferences;
