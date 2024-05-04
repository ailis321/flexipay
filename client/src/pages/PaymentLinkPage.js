// this is the payment link page where the user can create a payment link for their customrs
// the user will be able to enter the amount and a description of the payment and choose from a dropdown of
// their customers details which are retrieved from stripe to send the payment link to
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentLink from '../components/PaymentLink';
import { Card, CardContent, Typography, Box, Container, Paper, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';



const PaymentLinkPage = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthenticationContext();  

  useEffect(() => {
      if (!user) {
          navigate('/login');
  
      }
  }, [navigate, user]);

  const token = user ? user.token : null;

  const [openDialog, setOpenDialog] = useState(false);

 
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography component="h1" variant="h5" gutterBottom align="center">
              Create Payment Link
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Quickly generate a payment link for your customers.
            </Typography>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PaymentIcon color="primary" />
                  </Box>
                  <PaymentLink token={token} />
                </Box>
              </CardContent>
            </Card>
            <Box mt={2} display="flex" justifyContent="center" alignItems="center">
            <InfoOutlinedIcon color="info" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Need help? Check out our 
                <Button onClick={handleOpenDialog} component="span" style={{textTransform: 'none'}}>
                  payment link guide
                </Button>.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <img 
            src={`${process.env.PUBLIC_URL}/paymentLink.jpg`} 
            alt="Create Payment" 
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>
            Here's how to create a payment link:
            <ol>
              <li>Enter the amount you wish to request from the customer.</li>
              <li>Add a description for the payment request. This will be useful for transaction data and reporting</li>
              <li>Select the customer you wish to send the payment link to. Ensure you have added the customer first to your Client Directory</li>
              <li>If this customer has not been registered, please click on "Add Customer" in the top menu.</li>
              <li>Click on 'Generate Link' to create a unique payment link.</li>
              <li>Copy and share the generated link with your customer.</li>
            </ol>
            This link can be used by your customers to make secure payments directly into your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PaymentLinkPage;
