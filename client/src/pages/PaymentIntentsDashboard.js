// this is a payment intent dashbaord that shows all payment intents with their status and amount
// it also shows a pie chart of the payment intents that have been fulfilled and the ones that have not been fulfilled
// a chart with amount received and amount waiting as well
// it also allows the user to cancel a payment intent and generate a new payment link to send their client a reminder

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Button,
  Snackbar,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useGetIntents from "../hooks/useGetIntents";
import useRetrieveClients from "../hooks/useRetrieveClients";
import useCancelPaymentIntent from "../hooks/useCancelPaymentIntent";
import SidebarMenu from "../components/SidebarMenu";
import useGenerateNewPaymentLink from "../hooks/useGenerateNewPaymentLink";
import Chart from "react-apexcharts";
import DateRangePicker from "../components/DateRangePicker";
import SearchBar from "../components/SearchBar";
import MuiAlert from "@mui/material/Alert";
import PaymentIntentsTable from "../components/PaymentIntentsTable"; 
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";

const drawerWidth = 240;
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const chartStyles = {
  maxWidth: "400px",
  margin: "0 auto",
};

const PaymentIntentsDashboard = () => {

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [link, setLink] = useState(null);
  const [open, setOpen] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIntents, setFilteredIntents] = useState([]);

  const navigate = useNavigate();
  const { user, dispatch } = useAuthenticationContext();  

  useEffect(() => {
      if (!user) {
          navigate('/login');
      } else {
          retrieveClients(user.token);
      }
  }, [navigate, user]);

  const token = user ? user.token : null;

  const { intents, isLoading, error, noIntents } = useGetIntents(token);
  const { retrieveClients, getClientById } = useRetrieveClients();
  const { generateNewPaymentLink } = useGenerateNewPaymentLink();
  const { cancelPaymentIntent, cancelError } = useCancelPaymentIntent();


  useEffect(() => {
    const filterIntents = () => {
      const filtered = intents.filter(intent => {
        const intentDate = new Date(intent.created * 1000); 
        const client = getClientById(intent.customer); 
        const matchesDateRange = intentDate >= startDate && intentDate <= endDate;
        const matchesSearchTerm = client?.name.toLowerCase().includes(searchTerm.toLowerCase());
  
        return matchesDateRange && matchesSearchTerm;
      });
  
      setFilteredIntents(filtered);
      console.log("filtered intents: ", filtered);
    };
  
    if (intents.length > 0 && !isLoading) {
      filterIntents();
    }
  }, [intents, startDate, endDate, searchTerm, getClientById, isLoading]);
  

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

  const fulfilledIntents = filteredIntents.filter((intent) => intent.status === "succeeded");
  const unfulfilledIntents = filteredIntents.filter((intent) => intent.status !== "succeeded" );

  // Dont want to show intents that are already cancelled for table data
  const allActiveIntents = filteredIntents.filter((intent) => intent.status !== "canceled");
  

  // only want to include intents that are waiting for payment and not cancelled in chart data
  const allUnsuccessfulIntents = unfulfilledIntents.filter(
    (intent) =>
      intent.status === "requires_confirmation" ||
      intent.status === "requires_payment_method"
  );


  const amountReceived = fulfilledIntents.reduce((total, intent) => total + intent.amount / 100, 0);
  const amountUnfulfilled = allUnsuccessfulIntents.reduce((total, intent) => total + intent.amount / 100, 0);

  const chartOptions = {
    series: [fulfilledIntents.length, allUnsuccessfulIntents.length],
    labels: ["Intents Fulfilled", "Intents Unfulfilled"],
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

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SidebarMenu open={open} handleDrawerClose={() => setOpen(!open)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
        <Typography variant="h6" align="center" style={{ padding: '16px 0' }}>
          {`Payment Link Dashboard`} 
        </Typography>
           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} label={'Search By Customer Name..'}/>
          
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
    
          {isLoading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!isLoading && !noIntents && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginBottom: "32px",
                  marginTop: "32px",
                }}
              >
                <Paper sx={chartStyles}>
                  <Chart options={chartOptions} series={chartOptions.series} type="pie" />
                </Paper>
                <Paper sx={chartStyles}>
                  <Chart options={amountChartOptions} series={amountChartOptions.series} type="pie" />
                </Paper>
              </Box>
              <Box sx={{ my: 4 }}>
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
                <PaymentIntentsTable
                  allActiveIntents={allActiveIntents}
                  getClientById={getClientById}
                  handleCancelIntent={handleCancelIntent}
                  handleGenerateLink={handleGenerateLink}
                  title="All Payment Intents"
                />
              </Box>
            </Box>
          )}
          {noIntents && <Typography>No Payment Intents Found</Typography>}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentIntentsDashboard;
