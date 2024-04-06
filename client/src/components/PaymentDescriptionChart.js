import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PaymentDescriptionChart = ({ paymentHistory, customerName}) => {
if (paymentHistory.length === 0) {
    return null;
  }

  const descriptionCounts = paymentHistory.reduce((acc, { description, status }) => {
    if(status === 'succeeded' || status === 'requires_payment_method' || status === 'requires_confirmation') {
      acc[description] = (acc[description] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(descriptionCounts),
    datasets: [{
      label: 'Number of Payments by Description',
      data: Object.values(descriptionCounts),
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
      tooltip: {
        
      }
    }
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}> 
    <h2 style={{ textAlign: 'center' }}>{customerName}'s most common payment reasons</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PaymentDescriptionChart;
