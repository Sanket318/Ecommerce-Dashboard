import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12000, 15000, 18000, 20000, 22000, 25000],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    x: { display: true, grid: { display: false } },
    y: { display: true, grid: { drawBorder: false } },
  },
};

const SalesChart = () => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '0.75rem',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
        mt: 3,
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        Sales (Last 6 Months)
      </Typography>
      <Line data={data} options={options} />
    </Paper>
  );
};

export default SalesChart;
