import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, Alert } from '@mui/material';
import useChangePassword from '../hooks/useChangePassword';

const ChangePasswordDialog = ({ open, handleClose, token }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
  } = useChangePassword(token, handleClose); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {/* If success message exists, display it */}
          {success && <Alert severity="success">Password changed successfully!</Alert>}
          <TextField
            margin="dense"
            name="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.currentPassword}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.newPassword}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            disabled={loading}
          />
    
          {loading && (
            <CircularProgress size={24} />
          )}
          
          {/* Display error message when there is an error */}
          {error && (
            <Alert severity="error">{error}</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={loading}>
            Change Password
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordDialog;
