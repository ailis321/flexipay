import React, { useEffect, useState } from "react";
import {
  Box, CssBaseline, Grid, ThemeProvider, Typography, createTheme, TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SidebarMenu from "../components/SidebarMenu";
import StatisticCard from "../components/StatisticCard";
import TopCustomersList from "../components/TopCustomersList";
import useTransactions from "../hooks/useTransactions";
import AllCustomersList from "../components/AllCustomersList";
import TotalAmountCard from "../components/TotalAmountCard";
import useRetrieveClients from "../hooks/useRetrieveClients";
import { Bar } from "react-chartjs-2";

const drawerWidth = 240;

const CustomerActivityPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const token = user ? user.token : null;
  const { clients, retrieveClients, getClientById, isLoading: isLoadingClients, error: clientsError } = useRetrieveClients();
  const { transactions, isLoading, error } = useTransactions(token);

  useEffect(() => {
    if (token) {
      retrieveClients(token);
    }
  }, [token, retrieveClients]);

  const [topCustomerAmountsSentByName, setTopCustomerAmountsSentByName] = useState([]);
  const [allCustomerAmountsSentByName, setAllCustomerAmountsSentByName] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [numberOfPayments, setNumberOfPayments] = useState(0);

  useEffect(() => {
    if (!isLoadingClients && clients.length > 0) {
      const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.created * 1000);
        return transactionDate >= startDate && transactionDate <= endDate;
      });

      const numberOfPayments = filteredTransactions.filter(transaction => transaction.type === 'charge' || transaction.type === 'payment' ).length;
      setNumberOfPayments(numberOfPayments);

      const payouts = Math.abs(filteredTransactions.filter(transaction => transaction.type === 'payout').reduce((sum, curr) => sum + curr.amount / 100, 0));
      setPayouts(payouts);
  

      const paymentAmounts = {};
      filteredTransactions.forEach(curr => {
        if ((curr.type === 'charge' || curr.type ==='payment') && curr.source.customer) {
          const customer = getClientById(curr.source.customer);
          const customerId = customer ? customer.id : "Unknown Customer";  //using ID as identifier because name can be duplicated
          if (!paymentAmounts[customerId]) {
            paymentAmounts[customerId] = { totalSent: 0, name: customer ? customer.name : "Unknown" };
          }
          paymentAmounts[customerId].totalSent += curr.amount / 100;
        }
      });

      console.log(paymentAmounts);
  
      //this creates a list from the payment amounts using customer ID and include names for display
      const clientAmounts = Object.keys(paymentAmounts).map(id => ({
        id: id,
        name: paymentAmounts[id].name,
        totalSent: paymentAmounts[id].totalSent
      }));


      console.log(clientAmounts);
  
   
      const filteredClientAmounts = clientAmounts.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
    //top 5 customers by amount sent
      const topFiveCustomers = filteredClientAmounts
        .sort((a, b) => b.totalSent - a.totalSent)
        .slice(0, 5);
  
      setTopCustomerAmountsSentByName(topFiveCustomers);
      setAllCustomerAmountsSentByName(filteredClientAmounts);
    }
  }, [transactions, isLoadingClients, clients, getClientById, startDate, endDate, searchTerm]);
  

  const barChartData = {
    labels: topCustomerAmountsSentByName.map((customer) => customer.name),
    datasets: [
      {
        label: "Total Received",
        data: topCustomerAmountsSentByName.map((customer) => customer.totalSent.toFixed(2)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const barChartOptions = {
    indexAxis: "y", 
    elements: { bar: { borderWidth: 2 } },
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Top Customers by Amount Received" },
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
              <TextField
                fullWidth
                label="Search by Customer Name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 20 }}
              />
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="d MMMM, yyyy"
              />
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="d MMMM, yyyy"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatisticCard title="Total Charges Received " value={numberOfPayments} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalAmountCard title="Total Amount Received" amount={allCustomerAmountsSentByName.reduce((sum, cust) => sum + cust.totalSent, 0)} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalAmountCard title="Total Amount Withdrawn" amount={payouts} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Top Customers
              </Typography>
              <TopCustomersList customers={topCustomerAmountsSentByName} />
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
              All Customers Received Payments from
            </Typography>
            <AllCustomersList customers={allCustomerAmountsSentByName} onClickCustomer={handleCustomerClick} />
          </Grid>
      
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CustomerActivityPage;
