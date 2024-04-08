import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

const ActivityBarChart = ({ data }) => {

  const mostRecentDate = new Date(Math.max(...data.map(d => new Date(d.date.split('/').reverse().join('-')))));


  const thirtyDaysAgo = new Date(mostRecentDate);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);


  const last30DaysData = data.filter(d => {
    const parsedDate = new Date(d.date.split('/').reverse().join('-'));
    return parsedDate >= thirtyDaysAgo;
  });


  const sortedData = last30DaysData
    .map(d => ({ ...d, parsedDate: new Date(d.date.split('/').reverse().join('-')) }))
    .sort((a, b) => a.parsedDate - b.parsedDate);

  const aggregatedData = sortedData.reduce((acc, { date, amount }) => {
    acc[date] = (acc[date] || 0) + amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: 'Amount',
        data: Object.values(aggregatedData),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Payment Intent Amounts over last 30 days',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Amount (£)',
        },
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

export default ActivityBarChart;
