import React from 'react';
import { Box, Container, Typography, Button, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HowItWorksPage() {
  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  if (!token) {
    navigate("/login");
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, backgroundColor: '#f4f4f4' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
          Welcome to FlexiPay
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Congratulations on setting up your account. You're all set to begin sending one-off payment links to your clients via email, social media, WhatsApp, or text. Your clients will receive these requests and can choose from a variety of digital payment methods.
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Stay informed with instant email notifications for each successful transaction, and manage your finances effectively through your dedicated Dashboard.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Dive into detailed insights with data segmented by customer activity, and keep track of payment intents and outstanding balances at a glance. Leverage analytics to identify your top contributors and enhance your financial strategy.
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          With your preferences configured, payment links will be uniquely tailored to your brand, ensuring clients recognise the source and enhancing trust in your transactions.
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Ready to get started? The first step is to create a customer directory and begin sending out payment requests.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" sx={{ backgroundColor: '#53937d' }} onClick={() => navigate('/create-customer')}>
            Add Customers Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default HowItWorksPage;
