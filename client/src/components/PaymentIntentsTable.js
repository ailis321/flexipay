import React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "./Title";

const PaymentIntentsTable = ({ allActiveIntents, getClientById, handleCancelIntent, handleGenerateLink, title}) => (
  <React.Fragment>
  <Paper sx={{ mt: 3, p: 2, overflow: 'hidden' }}>
      <Title>{title}</Title>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="payment intents table">
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
                <TableCell>{new Date(intent.created * 1000).toLocaleDateString()}</TableCell>
                <TableCell>{getClientById(intent.customer)?.name || intent.customer}</TableCell>
                <TableCell align="right">{`£${(intent.amount / 100).toFixed(2)}`}</TableCell>
                <TableCell>
                  {intent.status === "succeeded" ? "Payment Received" :
                  intent.status === "requires_payment_method" || "requires_confirmation" ? "Awaiting Payment" :
                  intent.status === "canceled" ? "Cancelled" : "Unknown"}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    {intent.status !== "succeeded" && (
                      <>
                        <Button
                          variant="contained"
                          onClick={() => handleCancelIntent(intent.id)}
                          sx={{ backgroundColor: "#53937d", "&:hover": { backgroundColor: "#456f5a" } }}
                        >
                          Cancel Intent
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleGenerateLink(intent.id)}
                          sx={{ backgroundColor: "#53937d", "&:hover": { backgroundColor: "#456f5a" } }}
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
    </Paper>
  </React.Fragment>
);

export default PaymentIntentsTable;
