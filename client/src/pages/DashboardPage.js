import React from 'react';
import useTransactions from '../hooks/useTransactions'; 
import PaymentTrendsChart from '../components/PaymentTrendsChart';
import SummaryWidget from '../components/SummaryWidget';
import PaymentsTable from '../components/PaymentsTable';

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const { transactions, isLoading, error } = useTransactions(token);

  const charges = transactions.filter(transaction => transaction.type === 'charge');
  const payouts = transactions.filter(transaction => transaction.type === 'payout');

  const chargeTrends = charges.map(charge => ({
    date: new Date(charge.created * 1000).toLocaleDateString(),
    amount: charge.amount / 100,
  }));

  const payoutTrends = payouts.map(payout => ({
    date: new Date(payout.created * 1000).toLocaleDateString(),
    amount: Math.abs(payout.amount) / 100, 
  }));

  //this iterates over the chargeTrends array and sum the amount property of each object
  const totalReceived = chargeTrends.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaidOut = payoutTrends.reduce((acc, curr) => acc + curr.amount, 0); 
 
  const totalTransactionsRecd = charges.length;
  const totalTransactionsPaid = payouts.length;


  return (
    <section className="bg-light py-5">
      <div className="dashboard-page container">
        <h1>Dashboard</h1>
        {isLoading && <p>Loading transactions...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && (
          <>
            <div className="row">
              <div className="col-lg-8">
                <PaymentTrendsChart data={chargeTrends} title="Payments Received" type="charge"/>
              </div>
              <div className="col-lg-4">
                <SummaryWidget title="Total Received" value={`£${totalReceived.toFixed(2)}`} />
                <SummaryWidget title="Transactions" value={totalTransactionsRecd} />
              </div>
            </div>
            <section className="bg-light py-5">
            </section>
            <div className="row mt-4">
              <div className="col-lg-8">
                <PaymentTrendsChart data={payoutTrends} title="Payments Out" type="payout"/>
              </div>
              <div className="col-lg-4">
                <SummaryWidget title="Total Paid Out" value={`£${totalPaidOut.toFixed(2)}`} />
                <SummaryWidget title="Transactions" value={totalTransactionsPaid} />
              </div>
              <PaymentsTable transactions={charges} type="charge" />
            <PaymentsTable transactions={payouts} type="payout" />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
