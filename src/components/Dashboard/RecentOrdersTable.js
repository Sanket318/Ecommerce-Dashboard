import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Paper,
  Typography,
} from '@mui/material';
import mockOrders from '../../data/mockOrders';

const headCells = [
  { id: 'id', label: 'Order ID' },
  { id: 'customer', label: 'Customer' },
  { id: 'date', label: 'Date' },
  { id: 'status', label: 'Status' },
  { id: 'total', label: 'Total' },
];

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'date') {
    // Date comparison
    return new Date(b[orderBy]) - new Date(a[orderBy]);
  }
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const RecentOrdersTable = () => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedOrders = [...mockOrders].sort(getComparator(order, orderBy));

  return (
    <Paper sx={{ borderRadius: '0.75rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', mt: 3 }}>
      <Typography sx={{ p: 2 }} variant="h6" fontWeight={700}>
        Recent Orders
      </Typography>
      <TableContainer>
        <Table size="small" aria-label="recent orders table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{ fontWeight: 600 }}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOrders.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentOrdersTable;
