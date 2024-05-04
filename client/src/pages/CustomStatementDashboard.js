
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StatisticCard from '../components/StatisticCard';
import useGetAllCustomers from '../hooks/useGetAllCustomers';
import useGetIntents from '../hooks/useGetIntents';
import SidebarMenu from '../components/SidebarMenu';
import DateRangePicker from '../components/DateRangePicker';
import SearchBar from '../components/SearchBar';
import useTransactions from '../hooks/useTransactions';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';
import TransactionStatement from '../components/TransactionStatement';

const CustomStatementDashboard = () => {
    const drawerWidth = 240;
  

    const [customStats, setCustomStats] = useState({
        totalIncome: 0,
        netIncome: 0,
        transactionCount: 0,
        uniqueCustomers: 0,
        thisPeriodTransactions: [],
    });

  
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const navigate = useNavigate();
    const { user, dispatch } = useAuthenticationContext();  
  
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);
  
    const token = user ? user.token : null;
  
  
    const { transactions, isLoading: isLoadingTransactions, error: errorTransactions } = useTransactions(token);
    const { customers, isLoading: isLoadingCustomers, error: errorCustomers } = useGetAllCustomers(token);
    const { intents, isLoading: isLoadingIntents, error: errorIntents } = useGetIntents(token);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
       
        const chargeTransactions = transactions.filter(transaction => transaction.type === 'charge' || transaction.type === 'payment');
    
        if (transactions) {
            
            //Filtering transactions based on date range and search term
            const allFilteredTransactions = transactions.filter(transaction => {
                const transactionDate = new Date(transaction.created * 1000); 
                const description = transaction.description ? transaction.description.toLowerCase() : "";
                console.log ("description", description)
                console.log ("searchTerm", searchTerm) 
                const matchesDate = transactionDate >= startDate && transactionDate <= endDate;
                const matchesSearch = description.toLowerCase().includes(searchTerm.toLowerCase());
                console.log ("matchesSearch", matchesSearch)
           
                return matchesDate && matchesSearch;

           
            });
    
    
            const totalIncome = allFilteredTransactions
                .filter(t => t.type === 'charge' || t.type === 'payment')
                .reduce((acc, transaction) => acc + transaction.amount, 0);
            const netIncome = allFilteredTransactions
                .filter(t => t.type === 'charge' || t.type === 'payment')
                .reduce((acc, transaction) => acc + (transaction.amount - transaction.fee), 0);
            const transactionCount = allFilteredTransactions.length;
            const uniqueCustomers = new Set(allFilteredTransactions.map(transaction => transaction.source.customer)).size;
    
            setCustomStats({
                totalIncome: totalIncome / 100,
                netIncome: netIncome / 100,
                transactionCount: transactionCount,
                uniqueCustomers : uniqueCustomers,
                thisPeriodTransactions: allFilteredTransactions,
            });
        }
    }, [transactions, startDate, endDate, searchTerm]);
    
  
  
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
                            {`Transaction Statement for ${startDate.toDateString()} to ${endDate.toDateString()}`} 
                        </Typography>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} label={"Search by Payment Description.."} />
          
                         <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <StatisticCard title="Total Income" value={`£${customStats.totalIncome.toFixed(2)}`} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticCard title="Net Income" value={`£${customStats.netIncome.toFixed(2)}`} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticCard title="Total Transactions" value={customStats.transactionCount} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticCard title="Payments sources" value={customStats.uniqueCustomers} />
                            </Grid>
                            <TransactionStatement
                         transactions={customStats.thisPeriodTransactions}
                        timeRange={{
                         start: startDate,
                         end: endDate,
                             }}
                        title={ null } 
                        />
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default CustomStatementDashboard;
