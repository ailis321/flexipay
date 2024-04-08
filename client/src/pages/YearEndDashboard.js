// this is like a statement of account for the year showing income in and out with balance
// user will be able to download the statement as a PDF
// Also shows summaries of income and outgoings for the year
// will show how many different customers have made payments in this time period
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
    getStartOfCurrentYear,
    getEndOfCurrentYear,

} from '../utils/dateHelpers';

import TransactionStatement from '../components/TransactionStatement';

const YearEndDashboard = () => {
    const drawerWidth = 240;

    const currentYear = new Date().getFullYear();
  
    // States for statistics
    const [yearEndStats, setYearEndStats] = useState({
        totalIncome: 0,
        netIncome: 0,
        transactionCount: 0,
        uniqueCustomers: 0,
        thisYearTransactions: [],
    });
  
    const year = new Date().getFullYear();
  
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
            const allFilteredTransactions = transactions.filter(transaction => {
                const transactionDate = new Date(transaction.created * 1000);
                return transactionDate >= getStartOfCurrentYear() && transactionDate <= getEndOfCurrentYear();
            });

            const chargeFilteredTransactions = chargeTransactions.filter(transaction => {
                const transactionDate = new Date(transaction.created * 1000);
                return transactionDate >= getStartOfCurrentYear() && transactionDate <= getEndOfCurrentYear();
            });
           


            const totalIncome = chargeFilteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
            const netIncome = chargeFilteredTransactions.reduce((acc, transaction) => acc + (transaction.amount - transaction.fee), 0);
            const transactionCount = allFilteredTransactions.length;
            const uniqueCustomers = new Set(allFilteredTransactions.map(transaction => transaction.source.customer)).size;

            setYearEndStats({
                totalIncome: totalIncome / 100,
                netIncome: netIncome / 100,
                transactionCount,
                uniqueCustomers,
                thisYearTransactions: allFilteredTransactions,
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
                            {`${year} Year-End Overview`} 
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <StatisticCard title="Total Income" value={`£${yearEndStats.totalIncome.toFixed(2)}`} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticCard title="Net Income" value={`£${yearEndStats.netIncome.toFixed(2)}`} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticCard title="Total Transactions" value={yearEndStats.transactionCount} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticCard title="Payments sources" value={yearEndStats.uniqueCustomers} />
                            </Grid>
                            <TransactionStatement
                         transactions={transactions}
                        timeRange={{
                         start: getStartOfCurrentYear(),
                         end: getEndOfCurrentYear(),
                             }}
                        title={`${currentYear} Year-End Overview`} 
                        />
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default YearEndDashboard;
