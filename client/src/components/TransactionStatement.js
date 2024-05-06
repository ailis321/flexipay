
import { useRef } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, Paper } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const TransactionStatement = ({ transactions, timeRange, title }) => {
  
    //Sorting transactions by date in ascending order for the balance calculation
  const sortedTransactions = transactions.sort((a, b) => a.created - b.created);

  //calculate starting balance based on date range provided
  let startingBalance = sortedTransactions.reduce((acc, transaction) => {
    const transactionDate = new Date(transaction.created * 1000);
    if (transactionDate < timeRange.start) {
      return acc + transaction.net;
    }
    return acc;
  }, 0);

  // Filter transactions based on the provided time range
  const filteredTransactions = sortedTransactions.filter(transaction => {
    const transactionDate = new Date(transaction.created * 1000);
    return transactionDate >= timeRange.start && transactionDate <= timeRange.end;
  });

  // Calculate the running balance for the filtered transactions
  let runningBalance = startingBalance;
  const transactionsWithRunningBalance = filteredTransactions.map(transaction => {
    runningBalance += transaction.net;//using net so stripe fees are taken off and shows true incoe
    return { ...transaction, runningBalance };
  }).reverse(); //shows most recent first

  const componentRef = useRef();

  const monthName = timeRange.start.toLocaleString('default', { month: 'long' });
  const year = timeRange.start.getFullYear();

  const handleDownloadPdf = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const data = canvas.toDataURL('image/png');

    //pdf sizings
    const imgWidth = 210; 
    const pageHeight = 295; 
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF('p', 'mm');
    let position = 0;

    pdf.addImage(data, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(data, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    pdf.save('transaction-statement.pdf');
  };

  return (
    <>
    <Button onClick={handleDownloadPdf} id="pdf-download-btn" variant="contained" color="primary">
      Download as PDF
    </Button>
    <TableContainer component={Paper} ref={componentRef}>
    <Typography variant="h6" align="center" style={{ padding: '16px 0' }}>
          {title} 
        </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="transaction table" id ='statement-table'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Payments In</TableCell>
            <TableCell align="right">Payments Out</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsWithRunningBalance.map((transaction, index) => {
            const isCharge = transaction.type === 'charge';
            return (
                
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {new Date(transaction.created * 1000).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  {isCharge ? `£${(transaction.net / 100).toFixed(2)}` : '—'}
                </TableCell>
                <TableCell align="right">
                  {!isCharge ? `£${(-transaction.amount / 100).toFixed(2)}` : '—'} {/*payouts using amount as no net value*/}
                </TableCell>
                <TableCell align="right">
                  {transaction.description}
                </TableCell>
                <TableCell align="right">
                  {transaction.source.receipt_email}
                </TableCell>
                <TableCell align="right">
                  {`£${(transaction.runningBalance / 100).toFixed(2)}`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TransactionStatement;
