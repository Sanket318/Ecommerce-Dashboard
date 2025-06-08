import React from 'react';
import Box from '@mui/material/Box';

import SummaryCards from './SummaryCards';
import RecentOrdersTable from './RecentOrdersTable';
import SalesChart from './SalesChart';

const Dashboard = () => {
  return (
    <Box sx={{ pb: 8 }}>
      <SummaryCards />
      <SalesChart />
      <RecentOrdersTable />
    </Box>
  );
};

export default Dashboard;
