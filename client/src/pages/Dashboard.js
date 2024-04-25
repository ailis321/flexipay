// main dashboard user will see when they log in
// this will only show todays data
// gives a graph repesentation of amount in over times of the day today
// shows total amount in and total amount out today
// shows a list of all transactions today

import * as React from "react";
import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {
  Button,
  Snackbar,
  Container,
  Typography,
  Paper,
  Link,
  Grid,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from 'react-router-dom';
import useGenerateNewPaymentLink from "../hooks/useGenerateNewPaymentLink";
import SidebarMenu from "../components/SidebarMenu";
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import Orders from "../components/Orders";
import PaymentIntentsTable from "../components/PaymentIntentsTable";
import useGetIntents from "../hooks/useGetIntents";
import useTransactions from "../hooks/useTransactions";
import useRetrieveClients from "../hooks/useRetrieveClients";
import useCancelPaymentIntent from "../hooks/useCancelPaymentIntent";
import ActivityBarChart from "../components/ActivityBarChart";
import MostCommonPaymentMethod from "../components/MostCommonPaymentMethod";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/home">
        FlexiPay
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [link, setLink] = useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token; 
  
  useEffect(() => {
    if (!token) { 
      navigate('/login');
    } else {
      retrieveClients(token);
    }
  }, [token]); 

  const { transactions, isLoading: isLoadingTransactions, error: errorTransactions } = useTransactions(token);
  const { intents, isLoading: isLoadingGetIntents, error: errorIntents, noIntents } = useGetIntents(token);
  const { retrieveClients, getClientById } = useRetrieveClients();
  const { generateNewPaymentLink } = useGenerateNewPaymentLink();
  const { cancelPaymentIntent, cancelError } = useCancelPaymentIntent();


  const handleCancelIntent = async (intentId) => {
    const wasCancelled = await cancelPaymentIntent(intentId);
    if (wasCancelled) {
      setMessage("Payment intent cancelled successfully.");
      setMessageType("success");
      setOpenSnackbar(true);
      setTimeout(() => window.location.reload(), 2000);
    } else {
      setMessage(cancelError || "Sorry, we were not able to complete your request.");
      setMessageType("error");
      setOpenSnackbar(true);
    }
  };

  const handleGenerateLink = async (intentId) => {
    const result = await generateNewPaymentLink(intentId);
    if (result && result.paymentLink) {
      setMessage(`New payment link generated successfully: ${result.paymentLink}`);
      setMessageType("success");
      setOpenSnackbar(true);
      setLink(result.paymentLink);
    } else {
      setMessage("Sorry, we were not able to generate a new link.");
      setMessageType("error");
      setOpenSnackbar(true);
    }
  };

  
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const todaysTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.created * 1000);
    return transactionDate >= startOfDay && transactionDate < endOfDay;
  });
  console.log("Todays Transactions: ", todaysTransactions);

  const charges = todaysTransactions.filter(
    (transaction) => transaction.type === "charge" || transaction.type === "payment"
  );
  console.log("Charges: ", charges);
  const payouts = todaysTransactions.filter(
    (transaction) => transaction.type === "payout"
  );

  const chargeTotal = charges.reduce((acc, curr) => acc + curr.amount, 0);
  const chargeConverted = chargeTotal / 100;
  const payoutTotal = payouts.reduce((acc, curr) => acc + curr.amount, 0);

  //incoming transactions converted to chart data
  const chargeTrends = charges.map((transaction) => ({
    time: new Date(transaction.created * 1000).toLocaleTimeString(),
    amount: transaction.amount / 100,
  }));

  //outgoings converted to chart data
  const payoutTrends = payouts.map((transaction) => ({
    time: new Date(transaction.created * 1000).toLocaleTimeString(),
    amount: transaction.amount / 100,
  }));

  const todaysPaymentIntents= intents.filter((intent) => {
    const intentDate = new Date(intent.created * 1000);
    return intentDate >= startOfDay && intentDate < endOfDay;
  });

//filter out cancelled ones for data
  const allActiveIntents = intents.filter((intent) => intent.status !== "canceled");

    // filtered out cancelled intents for chart data for todays intents
  const allActiveIntentsToday = todaysPaymentIntents.filter((intent) => intent.status !== "canceled");
  console.log("All Active Intents Today: ", allActiveIntentsToday);

  const allPaidIntents = allActiveIntentsToday.filter((intent) => intent.status === "succeeded");

  const outstandingIntents = allActiveIntentsToday.filter((intent) => ['requires_payment_method', 'requires_confirmation'].includes(intent.status));

  const totalAwaiting = allActiveIntentsToday
  .filter((payment) => ['requires_payment_method', 'requires_confirmation'].includes(payment.status))
  .reduce((acc, payment) => acc + payment.amount, 0) / 100;

  const intentsSentTrends = outstandingIntents.map((total) => ({
    time: new Date(total.created * 1000).toLocaleTimeString(),
    amount: total.amount / 100,
  }));

  const intentTrends = allActiveIntents.map((intent) => ({
    date: new Date(intent.created * 1000).toLocaleDateString(),
    amount: intent.amount / 100,
  }));

  console.log("Intent chart data : ", intentTrends);


  

  const customTheme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#53937d",
            color: "#ffffff",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SidebarMenu open={open} handleDrawerClose={() => setOpen(!open)} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={messageType}
              sx={{ width: "100%" }}
              action={
                messageType === "success" && link ? (
                  <Button color="inherit" size="small" onClick={() => window.open(link)}>
                    Open Link
                  </Button>
                ) : null
              }
            >
              {message}
            </Alert>
          </Snackbar>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart
                    transactions={chargeTrends}
                    isLoading={isLoadingTransactions}
                    error={errorTransactions}
                    title="Today's Transactions"
                  />
                </Paper>
              </Grid>
  
              {/* Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits total={chargeConverted} title ='Total Payments Received Today'/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits total={totalAwaiting} title='Total Payments Awaiting Today' />
                </Paper>
              </Grid>
               {/* Chart */}
               <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart
                    transactions={intentsSentTrends}
                    isLoading={isLoadingGetIntents}
                    error={errorIntents}
                    title="Today's Outstanding Transactions"
                  />
                </Paper>
              </Grid>
  
     
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders transactions={charges} />
                </Paper>
              </Grid>
  
           
              <Grid item xs={12} sx={{ mt: 4, mb: 4 }}> 
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <PaymentIntentsTable

                    allActiveIntents={allActiveIntentsToday}
                    getClientById={getClientById}
                    handleCancelIntent={handleCancelIntent}
                    handleGenerateLink={handleGenerateLink}
                    title={"Today's Payment Intents"}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sx={{ mt: 4 }}>
           <MostCommonPaymentMethod todaysTransactions={charges} />
            </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;