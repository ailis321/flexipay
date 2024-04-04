import * as React from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, SecondaryListItems } from "../components/ListItems";

import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import Orders from "../components/Orders";
import useTransactions from "../hooks/useTransactions";

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

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

    if (!user) {
    navigate('/login');
  }

  const { transactions, isLoading, error } = useTransactions(token);

  // Filter transactions for today
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

  const charges = todaysTransactions.filter(
    (transaction) => transaction.type === "charge"
  );
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
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
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
                    isLoading={isLoading}
                    error={error}
                  />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits total={chargeConverted} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders transactions={charges} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
