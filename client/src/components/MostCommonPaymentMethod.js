import React from 'react';
import { Pie } from 'react-chartjs-2';

const MostCommonPaymentMethod = ({ todaysTransactions }) => {
  if (todaysTransactions.length === 0) {
    return <p>No payment data available for today.</p>;
  }

  // Mapping from API method names to user-friendly names
  const methodNames = {
    'revolut_pay': 'Revolut',
    'bacs_debit': 'Bacs',
    'klarna': 'Klarna',
    'link': 'Link',
    'card': 'Card'
  };

  const paymentMethodCounts = todaysTransactions.reduce((acc, transaction) => {
    const apiMethod = transaction.source.payment_method_details.type;
    if (Object.keys(methodNames).includes(apiMethod)) {
      const userFriendlyName = methodNames[apiMethod];  
      acc[userFriendlyName] = (acc[userFriendlyName] || 0) + 1;  
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(paymentMethodCounts),
    datasets: [{
      label: 'Number of Payments by Method',
      data: Object.values(paymentMethodCounts),
      backgroundColor: [
        '#4c74b3',
        '#36A2EB',
        '#55aa96',
        '#4BC0C0',
        '#08ccf7',
        '#FF9F40'
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    maintainAspectRatio: true,
    aspectRatio: 1, 
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {}
    }
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}> 
      <h2 style={{ textAlign: 'center' }}>Today's Top Payment Methods</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default MostCommonPaymentMethod;
