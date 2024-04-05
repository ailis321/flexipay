import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Button,
  Snackbar,

  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import useGetIntents from "../hooks/useGetIntents";
import useRetrieveClients from "../hooks/useRetrieveClients";
import useCancelPaymentIntent from "../hooks/useCancelPaymentIntent";
import SidebarMenu from "../components/SidebarMenu";
import useGenerateNewPaymentLink from "../hooks/useGenerateNewPaymentLink";
import Chart from "react-apexcharts";
import MuiAlert from "@mui/material/Alert";

const drawerWidth = 240;

const chartStyles = {
  maxWidth: "400px", 
  margin: "0 auto", 
};


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const PaymentIntentsDashboard = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [link, setLink] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  if (!user) {
    navigate('/login');
  }


  const { intents, isLoading, error, noIntents } = useGetIntents(token);
  const { retrieveClients, getClientById, clients } = useRetrieveClients();
  const { generateNewPaymentLink } = useGenerateNewPaymentLink();

  const { cancelPaymentIntent, isCancelling, cancelError } =
    useCancelPaymentIntent();

  useEffect(() => {

    retrieveClients(token);
  }, [token, retrieveClients]);

  const fulfilledIntents = intents.filter(
    (intent) => intent.status === "succeeded"
  );
  const unfulfilledIntents = intents.filter(
    (intent) => intent.status !== "succeeded"
  );

  // dont want to show intents that are already cancelled
  const allActiveIntents = intents.filter(
    (intent) => intent.status !== "canceled"
  );

  const allUnsuccessfulIntents = intents.filter(
    (intent) =>
      intent.status === "requires_confirmation" ||
      intent.status === "requires_payment_method"
  );

  const handleCancelIntent = async (intentId) => {
    const wasCancelled = await cancelPaymentIntent(intentId);
    if (wasCancelled) {
      setMessage("Payment intent cancelled successfully.");
      setMessageType("success");
      setOpenSnackbar(true);
      setTimeout(() => window.location.reload(), 2000); //this reloads te page after 2 secs to show the updated intents
    } else {
      setMessage(
        cancelError || "Sorry, we were not able to complete your request."
      );
      setMessageType("error");
      setOpenSnackbar(true);
    }
  };
  const handleGenerateLink = async (intentId) => {
    const result = await generateNewPaymentLink(intentId);
    if (result && result.paymentLink) {
        //link in message to copy
      setMessage(
        `New payment link generated successfully: ${result.paymentLink}`
      );
      setMessageType("success");
      setOpenSnackbar(true);
      setLink(result.paymentLink); 
    } else {
      setMessage("Sorry, we were not able to generate a new link.");
      setMessageType("error");
      setOpenSnackbar(true);
    }
  };

  const amountReceived = fulfilledIntents.reduce(
    (total, intent) => total + intent.amount / 100,
    0
  );
  //want the stats to just include intents that have not been fufilled yet and not the ones that the user has cancelled
  const amountUnfulfilled = allUnsuccessfulIntents.reduce(
    (total, intent) => total + intent.amount / 100,
    0
  );

  const chartOptions = {
    series: [fulfilledIntents.length, unfulfilledIntents.length],
    labels: ["Fulfilled", "Unfulfilled"],
    chart: {
      type: "pie",
      width: "100%",
    },
    colors: ["#00E396", "#FF4560"],
    legend: {
      position: "bottom",
    },
  };

  const amountChartOptions = {
    series: [amountReceived, amountUnfulfilled],
    labels: ["Amount Received", "Amount Waiting"],
    chart: {
      type: "pie",
      width: "100%",
    },
    colors: ["#00E396", "#FF4560"],
    legend: {
      position: "bottom",
    },
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SidebarMenu open={open} handleDrawerClose={toggleDrawer} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {isLoading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!isLoading && !noIntents && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginBottom: "32px",
                }}
              >
                <Paper sx={{ ...chartStyles }}>
                  <Chart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="pie"
                  />
                </Paper>
                <Paper sx={{ ...chartStyles }}>
                  <Chart
                    options={amountChartOptions}
                    series={amountChartOptions.series}
                    type="pie"
                  />
                </Paper>
              </Box>
              <Box sx={{ my: 4 }}>
                {message && (
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
                          <Button
                            color="inherit"
                            size="small"
                            onClick={() => window.open(link)}
                          >
                            Open Link
                          </Button>
                        ) : null
                      }
                    >
                      {message}
                    </Alert>
                  </Snackbar>
                )}
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="payment intents table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Recipient</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allActiveIntents.map((intent) => (
                        <TableRow key={intent.id}>
                          <TableCell>
                            {new Date(intent.created * 1000).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {getClientById(intent.customer)?.name || intent.customer}
                          </TableCell>
                          <TableCell align="right">
                            {(intent.amount / 100).toFixed(2)}
                          </TableCell>
                          <TableCell>{intent.status}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                              }}
                            >
                              {intent.status !== "succeeded" && (
                                <>
                                  <Button
                                    variant="contained"
                                    onClick={() => handleCancelIntent(intent.id)}
                                    sx={{
                                      backgroundColor: "#53937d",
                                      "&:hover": {
                                        backgroundColor: "#456f5a",
                                      },
                                    }}
                                  >
                                    Cancel Intent
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={() => handleGenerateLink(intent.id)}
                                    sx={{
                                      backgroundColor: "#53937d",
                                      "&:hover": {
                                        backgroundColor: "#456f5a",
                                      },
                                    }}
                                  >
                                    Generate Link
                                  </Button>
                                </>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          )}
          {noIntents && <Typography>No Payment Intents Found</Typography>}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
  
export default PaymentIntentsDashboard;