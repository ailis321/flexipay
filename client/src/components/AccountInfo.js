import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  Divider,
  Paper,
  Grid,
  Box,
  Button,
 
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChangePasswordDialog from './ChangePasswordDialog'; 



// Account Info Component
const AccountInfo = ({ profileInfo, token }) => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleEditAccount = () => {
//TODO
  };

  const handleOpenChangePasswordDialog = () => {
    setIsPasswordDialogOpen(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setIsPasswordDialogOpen(false);
  };

  return (
    <>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: '#53937d', width: 56, height: 56 }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography variant="h4" component="h1" gutterBottom>
          My Account
        </Typography>
      </Box>
      <Divider sx={{ width: '100%', my: 2 }} />
      <Paper elevation={3} sx={{ p: 3, width: '100%', bgcolor: '#53937d', color: 'white' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">First Name:</Typography>
            <Typography>{profileInfo.firstName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Last Name:</Typography>
            <Typography>{profileInfo.lastName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Email:</Typography>
            <Typography>{profileInfo.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Business Name:</Typography>
            <Typography>{profileInfo.businessName}</Typography>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" size="small" onClick={handleEditAccount} sx={{ bgcolor: 'primary.contrastText', color: 'primary.main' }}>
            Edit Account
          </Button>
          <Button variant="outlined" size="small" onClick={handleOpenChangePasswordDialog} sx={{ bgcolor: 'white', border: '1px solid white' }}>
            Change Password
          </Button>
        </Box>
      </Paper>

      <ChangePasswordDialog
      open={isPasswordDialogOpen}
      handleClose={handleCloseChangePasswordDialog}
      token={token} 
    />
    </>
  );
};

export default AccountInfo;
