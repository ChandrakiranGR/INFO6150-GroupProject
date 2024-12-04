import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import axios from 'axios';

const ManageBodyShops = () => {
  const [bodyShops, setBodyShops] = useState([]);
  const [error, setError] = useState(null);

  const fetchBodyShops = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admin/bodyshops', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBodyShops(response.data.bodyShops);
    } catch (err) {
      console.error('Error fetching body shops:', err.message);
      setError('Failed to fetch body shops. Please try again later.');
    }
  };

  const deleteBodyShop = async (bodyShopId) => {
    try {
      await axios.delete(`http://localhost:5001/api/admin/bodyshops/${bodyShopId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Body Shop deleted successfully!');
      fetchBodyShops(); // Refresh the list
    } catch (err) {
      console.error('Error deleting body shop:', err.message);
      alert('Failed to delete body shop. Please try again.');
    }
  };

  useEffect(() => {
    fetchBodyShops();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Manage Body Shops
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyShops.map((bodyShop) => (
            <TableRow key={bodyShop._id}>
              <TableCell>{bodyShop.name}</TableCell>
              <TableCell>{bodyShop.email}</TableCell>
              <TableCell>{bodyShop.contactNumber}</TableCell>
              <TableCell>{bodyShop.address}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteBodyShop(bodyShop._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManageBodyShops;
