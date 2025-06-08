import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const data = [
  { label: 'Total Sales', value: '$120,000' },
  { label: 'Orders', value: '3,200' },
  { label: 'Active Users', value: '1,110' },
];

const SummaryCards = () => (
  <Grid container spacing={3}>
    {data.map(({ label, value }) => (
      <Grid item xs={12} sm={4} key={label}>
        <Paper
          sx={{
            p: 3,
            borderRadius: '0.75rem',
            boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {label}
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default SummaryCards;
