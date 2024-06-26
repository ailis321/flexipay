import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

import AssignmentIcon from '@mui/icons-material/Assignment';


export const MainListItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton id="dashboard-btn" onClick={() => navigate('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton id="customer-activity-btn" onClick={() => navigate('/customer-activity')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customer Activity" />
      </ListItemButton>
      <ListItemButton id="payment-intents-btn" onClick={() => navigate('/paymentIntents')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Payment Link Activity" />
      </ListItemButton>
      <ListItemButton id="payment-receipts-btn" onClick={() => navigate('/view-payments')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Payments & Receipts" />
      </ListItemButton>
   
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>

    <ListItemButton id="statement-search-btn" onClick={() => navigate('/custom-statement')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Statement Search" />
      </ListItemButton>

      <ListItemButton id="current-month-btn" onClick={() => navigate('/current-month')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
     
      <ListItemButton id="year-end-btn"  onClick={() => navigate('/year-end')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end" />
      </ListItemButton>
    </React.Fragment>
  );
};