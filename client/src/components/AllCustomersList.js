
import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar, CardActionArea } from '@mui/material';
import ProfileIcon from '@mui/icons-material/AccountCircle'; // 

const AllCustomersList = ({ customers, onClickCustomer }) => {
  return (
    <Grid container spacing={2}>
      {customers.map((customer, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardActionArea onClick={() => onClickCustomer(customer)}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ marginRight: 2 }}>
                  <ProfileIcon />
                </Avatar>
                <div>
                  <Typography variant="subtitle1">{customer.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Received: £{customer.totalSent ? customer.totalSent.toFixed(2) : '0.00'}
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllCustomersList;
