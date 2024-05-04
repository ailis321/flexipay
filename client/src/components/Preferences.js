import React from 'react';
import { Typography, Divider, Paper, Grid, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Preferences = ({ preferences }) => {

  const navigate = useNavigate();
 
  // Excluding certain keys from being displayed
  const excludedKeys = new Set(["_id", "stripeAccountId", "__v", "createdAt", "updatedAt"]);

  //Custom formatting for specific keys to show in more user friendly way
  const formatValue = (key, value) => {
    if (key === 'typeOfPaymentsToReceive') {
      return value.join(', '); 
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
              <Grid item xs={12} sm={6} key={key} sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </Typography>
                <Typography component="div">
                  {formatValue(key, value)}
                </Typography>
              </Grid>
            ))}
                 <Button 
                    variant="contained" 
                    onClick={() => navigate('/preferences')}
                    sx={{ bgcolor: '#53937d', border: '1px solid white', color: 'white' }}
                    > Edit Customisation </Button>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Preferences;
