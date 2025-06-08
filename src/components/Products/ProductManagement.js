import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import mockProducts from '../../data/mockProducts';

const ProductManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddClick = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleModalSubmit = (productData) => {
    if (productData.id) {
      // Edit existing product
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? productData : p))
      );
    } else {
      // Add new product
      const maxId = products.reduce((max, p) => {
        const num = parseInt(p.id.slice(1), 10);
        return num > max ? num : max;
      }, 0);
      const newProduct = { ...productData, id: `P${String(maxId + 1).padStart(3, '0')}`, stock: 0 };
      setProducts((prev) => [newProduct, ...prev]);
    }
  };

  return (
    <Box sx={{ pb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700}>
          Product Management
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleAddClick}>
          Add Product
        </Button>
      </Box>
      <ProductTable products={products} onEdit={handleEditClick} />
      <ProductModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialData={editingProduct}
      />
    </Box>
  );
};

export default ProductManagement;
