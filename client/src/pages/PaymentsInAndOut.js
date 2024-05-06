// this is the view-payments page where the user can enter a date range to show the payments
// that have come in and been paid out during that date range
// the user can also get the receipt for the payments here if they need to resend to a customer
// it goes into details about payments including the id so gives a more detailed view than the dashboard/statememt pages

import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, SecondaryListItems } from "../components/ListItems";
import useTransactions from "../hooks/useTransactions";
import PaymentsTable from "../components/PaymentsTable";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { useEffect } from "react";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

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

const PaymentsInAndOut = () => {
  const [open, setOpen] = React.useState(true);
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


  const { transactions, isLoading, error, noTransactions } =
  useTransactions(token);
 const [startDate, setStartDate] = useState(new Date());
 const [endDate, setEndDate] = useState(new Date());
  
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.created * 1000);
    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const charges = filteredTransactions.filter(
    (transaction) => transaction.type === "charge" || transaction.type === "payment"
  );
  const payouts = filteredTransactions.filter(
    (transaction) => transaction.type === "payout"
  );

  if (noTransactions) {
    return (
      <ThemeProvider theme={customTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainListItems />
              <Divider sx={{ my: 1 }} />
              <SecondaryListItems />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Typography variant="h4" gutterBottom component="div">
                Payments
              </Typography>
              <Typography component="div" color="text.secondary">
                No transactions found.
              </Typography>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            backgroundColor: (customTheme) =>
            customTheme.palette.mode === "light"
                ? customTheme.palette.grey[100]
                : customTheme.palette.grey[900],
      
            paddingLeft: open ? `${drawerWidth}px` : customTheme.spacing(7),
            transition: customTheme.transitions.create("padding", {
              easing: customTheme.transitions.easing.sharp,
              duration: customTheme.transitions.duration.leavingScreen,
            }),
            [customTheme.breakpoints.up("sm")]: {
              paddingLeft: open ? `${drawerWidth}px` : customTheme.spacing(9),
            },
          }}
        >

       
          <Typography variant="h6" align="center" style={{ padding: '16px 0' }}>
          {`Payments and Receipts`} 
          </Typography>
            <div className="dashboard-page container-fluid">
              <div className="row">
                <div className="col-md-12">
                 <p>Date Range</p>
                  <div className="date-filter mb-4">
                    <DatePicker
                      id="start-date"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd-MM-yyyy"
                      isClearable={false}
                      placeholderText="Start Date"
                    />
                    <div className="mx-2">to</div>
                    <DatePicker
                      id="end-date"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd-MM-yyyy"
                      minDate={startDate}
                      isClearable={false}
                      placeholderText="End Date"
                    />
                  </div>

                  {isLoading && <p>Loading transactions...</p>}
                  {error && <p>{error}</p>}
                  {!isLoading && !error && transactions.length > 0 ? (
                    <>
                      <PaymentsTable transactions={charges} type="charge" />
                      <PaymentsTable transactions={payouts} type="payout" />
                    </>
                  ) : (
                    <p>No transactions found for the selected period.</p>
                  )}
                </div>
              </div>
            </div>


        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentsInAndOut;
