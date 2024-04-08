// this is the payment link page where the user can create a payment link for their customrs
// the user will be able to enter the amount and a description of the payment and choose from a dropdown of
// their customers details which are retrieved from stripe to send the payment link to
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentLink from '../components/PaymentLink';
import { Card, CardContent, Typography, Box, Container, Paper, Grid } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const PaymentLinkPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

 
    React.useEffect(() => {
        if (!user.token) {
          navigate("/login");
        }
      }, [user, navigate]);

  const token = user ? user.token : null;
  

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
                Need help? Check out our <a href="#">payment link guide</a>.
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
    </Container>
  );
};

export default PaymentLinkPage;
