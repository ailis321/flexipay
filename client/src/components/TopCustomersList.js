import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

const TopCustomersList = ({ customers }) => {
    //this ensures that the customers array is an array, if not it will be an empty array
  const safeCustomers = Array.isArray(customers) ? customers : [];

  return (
    <List dense>
      {safeCustomers.map((customer, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={customer.name}
            secondary={`Total Received: £${customer.totalSent.toFixed(2)}`} 
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TopCustomersList;
