import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import useTransactions from '../hooks/useTransactions';
import PaymentTrendsChart from '../components/PaymentTrendsChart';
import SummaryWidget from '../components/SummaryWidget';
import PaymentsTable from '../components/PaymentsTable';
import SidebarMenu from '../components/SidebarMenu';

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const navigate = useNavigate();
  const { transactions, isLoading, error, noTransactions } = useTransactions(token);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  if (!user) {
    navigate('/login');
  }

  //this filters transactions based on the date range 
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.created * 1000);
    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const charges = filteredTransactions.filter(transaction => transaction.type === 'charge');
  const payouts = filteredTransactions.filter(transaction => transaction.type === 'payout');

  const chargeTrends = charges.map(charge => ({
    date: new Date(charge.created * 1000).toLocaleDateString(),
    amount: charge.amount / 100,
  }));

  const payoutTrends = payouts.map(payout => ({
    date: new Date(payout.created * 1000).toLocaleDateString(),
    amount: Math.abs(payout.amount) / 100,
  }));

  const totalReceived = chargeTrends.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaidOut = payoutTrends.reduce((acc, curr) => acc + curr.amount, 0);

  const totalTransactionsRecd = charges.length;
  const totalTransactionsPaid = payouts.length;

  if (noTransactions) {
    return (
      <section className="bg-light py-5">
        <div className="dashboard-page container">
          <h1>Dashboard</h1>
          <p>No transactions found.</p>
        </div>
      </section>
    );
  }

  return (
        <section className="bg-light py-5">
          <div className="dashboard-page container-fluid">
            <div className="row">
        <div className="col-md-9">
        <h1>Dashboard</h1>
        <div className="date-filter mb-4">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd-MM-yyyy"
            isClearable={false}
            placeholderText="Start Date"
          />
          <div className="mx-2">to</div>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
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
            <div className="row">
              <div className="col-lg-8">
                <PaymentTrendsChart data={chargeTrends} title="Payments Received" type="charge" />
              </div>
              <div className="col-lg-4">
                <SummaryWidget title="Total Received" value={`£${totalReceived.toFixed(2)}`} />
                <SummaryWidget title="Transactions" value={totalTransactionsRecd} />
              </div>
            </div>
           <section className="py-5 bg-light d-flex justify-content-center align-items-center min-vh-40">
            </section>
            <div className="row mt-4">
              <div className="col-lg-8">
                <PaymentTrendsChart data={payoutTrends} title="Payments Out" type="payout" />
              </div>
              <div className="col-lg-4">
                <SummaryWidget title="Total Paid Out" value={`£${totalPaidOut.toFixed(2)}`} />
                <SummaryWidget title="Transactions" value={totalTransactionsPaid} />
              </div>
            </div>
            <PaymentsTable transactions={charges} type="charge" />
            <PaymentsTable transactions={payouts} type="payout" />
          </>
        ) : (
          <p>No transactions found for the selected period.</p>
        )}
      </div>
    </div>
    </div>
    </section>
  );
};

export default DashboardPage;
