// this is a detailed page for a specifiic customer
// it will show total received from this customer and if any intents are outstanding
// gives option to send a payment link
// shows payment history and any cancelled payments by business
// if any intents are awaiting status, can either cancel this intent or generate link again to send
// if intent is cancelled then totals will update immediately on page to reflect updated data
// shows any intents that have been cancelled by business
// shows a chart to give insight into the most common types of payment this customer sends by descpription

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SidebarMenu from "../components/SidebarMenu";
import ProfileInfo from "../components/ProfileInfo";
import ProfilePaymentHistory from "../components/ProfilePaymentHistory";
import useGetAllCustomers from "../hooks/useGetAllCustomers";
import StatisticCard from "../components/StatisticCard";
import useGetIntents from "../hooks/useGetIntents";
import CancelledPayments from "../components/CancelledPayments";
import PaymentDescriptionChart from "../components/PaymentDescriptionChart";

const drawerWidth = 240;
const customTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#53937d',
          color: '#ffffff',
        },
      },
    },
  },
});

const CustomerProfilePage = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (!user || !user.token) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const token = user?.token;

  const {
    customers,
    isLoading: isLoadingCustomers,
    error: errorCustomers,
  } = useGetAllCustomers(token);

  const {
    intents,
    isLoading: isLoadingIntents,
    error: errorIntents,
  } = useGetIntents(token);

  const [customer, setCustomer] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    if (token) {
      const specificCustomer = customers.find(
        (c) => c.stripeCustomerId === customerId
      );
      setCustomer(specificCustomer);

      const customerIntents = intents.filter(
        (intent) => intent.customer === specificCustomer?.stripeCustomerId
      );
      setPaymentHistory(customerIntents);
    }
  }, [customers, intents, token, customerId]);

  if (isLoadingCustomers || isLoadingIntents) {
    return <div>Loading...</div>;
  }


  if (!customer) {
    return <div>No customer found</div>;
  }

  // Calculate totals
  const totalReceived = paymentHistory
    .filter((payment) => payment.status === 'succeeded')
    .reduce((acc, payment) => acc + payment.amount, 0) / 100;

  const totalAwaiting = paymentHistory
    .filter((payment) => ['requires_payment_method', 'requires_confirmation'].includes(payment.status))
    .reduce((acc, payment) => acc + payment.amount, 0) / 100;

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SidebarMenu open={open} handleDrawerClose={toggleDrawer} />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Container>
            <Box sx={{ my: 4 }}>
              <Typography variant='h4' gutterBottom>
                Customer Profile
              </Typography>
              {customer && <ProfileInfo customer={customer} />}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                }}
              >
                <StatisticCard title='Total Received' value={`£${totalReceived.toFixed(2)}`} />
                <StatisticCard title='Total Awaiting' value={`£${totalAwaiting.toFixed(2)}`} valueStyle={{ color: 'red' }} />
              </Box>
              <ProfilePaymentHistory paymentHistory={paymentHistory.filter((payment) => payment.status !== 'canceled')} />
              <CancelledPayments cancelledPayments={paymentHistory.filter((payment) => payment.status === 'canceled')} />
              <Grid item xs={12} sx={{ mt: 4 }}>
              <PaymentDescriptionChart paymentHistory={paymentHistory} customerName={customer.name} />
            </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CustomerProfilePage;