import React, { useState, useMemo } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TextField,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


const headCells = [
  { id: 'image', label: 'Image', sortable: false },
  { id: 'title', label: 'Title', sortable: true },
  { id: 'price', label: 'Price', sortable: true },
  { id: 'stock', label: 'Stock', sortable: true },
  { id: 'actions', label: 'Actions', sortable: false },
];

const ProductTable = ({ products, onEdit }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [search, setSearch] = useState('');

  const handleRequestSort = (property) => {
    if (!property) return;
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, products]);

  const sortedProducts = useMemo(() => {
    if (!orderBy) return filteredProducts;
    return filteredProducts.slice().sort((a, b) => {
      if (orderBy === 'price' || orderBy === 'stock') {
        const aVal = Number(a[orderBy]);
        const bVal = Number(b[orderBy]);
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, order, orderBy]);

  return (
    <>
      <Box sx={{ mb: 2, maxWidth: 320 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: '0.75rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <Table size="small" aria-label="products table">
          <TableHead>
            <TableRow>
              {headCells.map(({ id, label, sortable }) => (
                <TableCell
                  key={id}
                  sortDirection={orderBy === id ? order : false}
                  sx={{ fontWeight: 600 }}
                >
                  {sortable ? (
                    <TableSortLabel
                      active={orderBy === id}
                      direction={orderBy === id ? order : 'asc'}
                      onClick={() => handleRequestSort(id)}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No products found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {sortedProducts.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Product">
                    <IconButton onClick={() => onEdit(product)} size="small" color="primary" aria-label={`edit ${product.title}`}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductTable;
