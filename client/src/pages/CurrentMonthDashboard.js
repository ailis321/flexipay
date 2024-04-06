// CurrentMonthDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StatisticCard from '../components/StatisticCard';
import useGetAllCustomers from '../hooks/useGetAllCustomers';
import useGetIntents from '../hooks/useGetIntents';
import SidebarMenu from '../components/SidebarMenu';

import useTransactions from '../hooks/useTransactions';
import {
    getStartOfCurrentMonth,
    getEndOfCurrentMonth,
    getStartOfCurrentYear,
    getEndOfCurrentYear,
    getMonthYearFromDate,

  
  } from '../utils/dateHelpers';

import TransactionStatement from '../components/TransactionStatement';

const CurrentMonthDashboard = () => {

    const drawerWidth = 240;


  
  // States for statistics
  const [currentMonthStats, setCurrentMonthStats] = useState({
    totalIncome: 0,
    netIncome: 0,
    transactionCount: 0,
    uniqueCustomers: 0,
    thisMonthTransactions: [],
  });

  const monthName = new Date().toLocaleString('default', { month: 'long' });
  
  const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

 
    useEffect(() => {
        if (!user.token) {
          navigate("/login");
        }
      }, [user, navigate]);
  

  const { transactions, isLoading: isLoadingTransactions, error: errorTransactions } = useTransactions(user.token);
  const { customers, isLoading: isLoadingCustomers, error: errorCustomers } = useGetAllCustomers(user.token);
  const { intents, isLoading: isLoadingIntents, error: errorIntents } = useGetIntents(user.token);




  useEffect(() => {

    const chargeTransactions = transactions.filter(transaction => transaction.type === 'charge');
    const payoutTransactions = transactions.filter(transaction => transaction.type === 'payout');

    if (transactions && customers && intents) {
      const now = new Date();
      const [currentMonth, currentYear] = getMonthYearFromDate(now);

      const allFilteredTransactions = transactions.filter(transaction => {
        const [month, year] = getMonthYearFromDate(new Date(transaction.created * 1000));
        return month === currentMonth && year === currentYear;
        });

        const allDatesFromTransactions = allFilteredTransactions.map(transaction => new Date(transaction.created * 1000));

        console.log('allFilteredTransactions by month :', allDatesFromTransactions);

      const chargeFilteredTransactions = chargeTransactions.filter(transaction => {
        const [month, year] = getMonthYearFromDate(new Date(transaction.created * 1000));
        return month === currentMonth && year === currentYear;
      });

      console.log('chargeFilteredTransactions:', chargeFilteredTransactions);

      const totalIncome = chargeFilteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
      const netIncome = chargeFilteredTransactions.reduce((acc, transaction) => acc + (transaction.amount - transaction.fee), 0);
      const transactionCount = chargeFilteredTransactions.length;
      const uniqueCustomers = new Set(chargeFilteredTransactions.map(transaction => transaction.source.customer)).size;

      setCurrentMonthStats({
        totalIncome: totalIncome / 100, 
        netIncome: netIncome / 100,
        transactionCount,
        uniqueCustomers,
        thisMonthTransactions: allFilteredTransactions,

      });
    }
  }, [transactions, customers, intents]);

  // Check if still loading any data
  const isLoading = isLoadingTransactions || isLoadingCustomers || isLoadingIntents;
  const error = errorTransactions || errorCustomers || errorIntents;

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

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
    <Box sx={{ flexGrow: 1, m: 2 }}>
       <Typography variant="h4" gutterBottom>
              {`${monthName} Overview`} 
        </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatisticCard title="Total Income" value={`£${currentMonthStats.totalIncome.toFixed(2)}`} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatisticCard title="Net Income" value={`£${currentMonthStats.netIncome.toFixed(2)}`} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatisticCard title="Total Transactions" value={currentMonthStats.transactionCount} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatisticCard title="Payments sources" value={currentMonthStats.uniqueCustomers} />
        </Grid>
        <TransactionStatement
        transactions={transactions}
        timeRange={{
         start: getStartOfCurrentYear(),
         end: getEndOfCurrentYear(),
         }}/> 
      </Grid>
    </Box>
    </Box>
    </Box>
    </ThemeProvider>
  );
};

export default CurrentMonthDashboard;
