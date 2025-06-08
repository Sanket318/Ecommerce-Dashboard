import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: 400,
  width: '90%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '0.75rem',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

const ProductModal = ({ open, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  // eslint-disable-next-line
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setTitle(initialData?.title || '');
      setPrice(initialData?.price?.toString() || '');
      setDescription(initialData?.description || '');
      setStock(initialData?.stock !== undefined ? initialData.stock.toString() : '');
      setImagePreview(initialData?.image || '');
      setImageFile(null);
      setErrors({});
    }
  }, [open, initialData]);

  const validate = () => {
    let tempErrors = {};
    if (!title.trim()) tempErrors.title = 'Title is required';
    if (!price.trim() || isNaN(price) || Number(price) <= 0)
      tempErrors.price = 'Valid price is required';
    if (!description.trim()) tempErrors.description = 'Description is required';
    if (stock === '' || isNaN(stock) || !Number.isInteger(Number(stock)) || Number(stock) < 0)
      tempErrors.stock = 'Stock must be a non-negative integer';
    if (!imagePreview) tempErrors.image = 'Image is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      id: initialData?.id,
      title: title.trim(),
      price: parseFloat(price),
      description: description.trim(),
      stock: Number(stock),
      image: imagePreview,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="product-modal-title" aria-describedby="product-modal-description">
      <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="product-modal-title" variant="h6" fontWeight={700} component="h2">
            {initialData ? 'Edit Product' : 'Add Product'}
          </Typography>
          <IconButton size="small" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </IconButton>
        </Stack>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          margin="normal"
          autoFocus
          required
        />
        <TextField
          fullWidth
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={!!errors.price}
          helperText={errors.price}
          margin="normal"
          required
          type="number"
          inputProps={{ step: '0.01', min: '0' }}
        />
        <TextField
          fullWidth
          label="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          error={!!errors.stock}
          helperText={errors.stock}
          margin="normal"
          required
          type="number"
          inputProps={{ step: '1', min: '0' }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <Button component="label" variant="outlined" fullWidth sx={{ my: 2 }}>
          Upload Image
          <input hidden type="file" accept="image/*" onChange={handleImageChange} />
        </Button>
        {errors.image && (
          <Typography variant="caption" color="error" sx={{ mt: -1, mb: 1 }}>
            {errors.image}
          </Typography>
        )}
        {imagePreview && (
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={{ display: 'block', maxWidth: '80%', maxHeight: 150, mx: 'auto', borderRadius: 2, mb: 2 }}
          />
        )}
        <Button variant="contained" type="submit" fullWidth size="large">
          {initialData ? 'Update Product' : 'Add Product'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductModal;
