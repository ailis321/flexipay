import React from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PaymentTrendsChart = ({ data, type }) => {

  const isCharge = type === 'charge';
  const labelTitle = isCharge ? 'Payments Received' : 'Payments Out';


  console.log("RAW DATA : ",data);

  const chartData = {
    labels: data.map(d => d.date), 
    datasets: [{
      label: labelTitle,
      data: data.map(d => d.amount),
      fill: false,
      backgroundColor: 'rgb(83, 147, 125)',
      borderColor: 'rgba(83, 147, 125, 0.2)',
    }]
  };


  const options = {
    scales: {
      y: {
        beginAtZero: true
      },
      
    },
    maintainAspectRatio: false
  };

  return <Line data={chartData} options={options} />;
};

export default PaymentTrendsChart;
