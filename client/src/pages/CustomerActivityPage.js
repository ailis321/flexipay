// this is the customer dashboard and gives insights into activity by customers
// shows top 5 customers by amount received
// will show a table with top 5 customer activity and amounts rec'd
// will then list all customer profiles showing names and amounts received in order
import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import StatisticCard from "../components/StatisticCard";
import TopCustomersList from "../components/TopCustomersList";
import ActivityTable from "../components/ActivityTable";
import useTransactions from "../hooks/useTransactions";
import AllCustomersList from "../components/AllCustomersList";
import TotalAmountCard from "../components/TotalAmountCard";
import useRetrieveClients from "../hooks/useRetrieveClients"; 
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const drawerWidth = 240;

const CustomerActivityPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => setOpen(!open);

  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const token = user ? user.token : null;

  const {
    clients,
    retrieveClients,
    getClientById,
    isLoading: isLoadingClients,
    error: clientsError,
  } = useRetrieveClients();
  const { transactions, isLoading, error } = useTransactions(token);

  useEffect(() => {
    if (token) {
      retrieveClients(token);
    }
  }, [token, retrieveClients]);

  const [customerAmountsSentByName, setCustomerAmountsSentByName] = useState(
    []
  );
  const [allCustomerAmountsSentByName, setAllCustomerAmountsSentByName] = useState(
    []
  );

  useEffect(() => {
    if (!isLoadingClients && clients.length > 0) {

    
      const paymentAmounts = transactions.reduce((acc, curr) => {
        if (curr.type === "charge" && curr.source.customer) {
          const customer = getClientById(curr.source.customer);
          const customerName = customer ? customer.name : "Unknown Customer";
          const amountSent = curr.amount / 100; 
          acc[customerName] = (acc[customerName] || 0) + amountSent;
        }
        return acc;
      }, {});

      const clientAmounts = clients.map(client => ({
        ...client,
        totalSent: paymentAmounts[client.name] || 0,
      }));
  
      setAllCustomerAmountsSentByName(clientAmounts);
  
      // Sort the array by totalSent in descending order and take the first 5
      const topFiveCustomers = clientAmounts
        .sort((a, b) => b.totalSent - a.totalSent)
        .slice(0, 5);
  
      setCustomerAmountsSentByName(topFiveCustomers);
    }
  }, [transactions, isLoadingClients, clients, getClientById]);
  

  const totalChargesCount = transactions.filter(
    (payment) => payment.type === "charge"
  ).length;
  const totalChargesAmount = transactions
    .filter((payment) => payment.type === "charge")
    .reduce((acc, curr) => acc + curr.amount / 100, 0);
  const totalPayoutAmount = transactions
    .filter((payment) => payment.type === "payout")
    .reduce((acc, curr) => acc + Math.abs(curr.amount) / 100, 0);

  console.log(
    customerAmountsSentByName.map((customer) => customer.totalSent.toFixed(2))
  );

  
  const barChartData = {
    labels: customerAmountsSentByName.map((customer) => customer.name),
    datasets: [
      {
        label: "Total Received",
        data: customerAmountsSentByName.map((customer) =>
          customer.totalSent.toFixed(2)
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const barChartOptions = {
    indexAxis: "y", 
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Customers by Amount Received",
      },
    },
  };

  

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

  const handleCustomerClick = (customer) => {

    navigate(`/customer-profile/${customer.id}`);
  };

  if (isLoadingClients) {
    return <div>Loading client information...</div>;
  }

  if (clientsError) {
    return <div>Error loading clients: {clientsError}</div>;
  }

  console.log("Clients" ,clients);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SidebarMenu open={open} handleDrawerClose={toggleDrawer} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Customer Activity
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatisticCard
                title="Total Charges Received "
                value={totalChargesCount}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalAmountCard
                title="Total Charges Amount"
                amount={totalChargesAmount}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalAmountCard
                title="Total Amount Withdrawn "
                amount={totalPayoutAmount}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Top Customers
              </Typography>
              <TopCustomersList customers={customerAmountsSentByName} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Customer Amounts
              </Typography>
              <Bar data={barChartData} options={barChartOptions} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
    <Typography variant="h6" gutterBottom>
      All Customers
    </Typography>
    <AllCustomersList customers={allCustomerAmountsSentByName} onClickCustomer={handleCustomerClick} />
  </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default CustomerActivityPage;
