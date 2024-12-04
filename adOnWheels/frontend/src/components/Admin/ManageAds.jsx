import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import axios from 'axios';

const ManageAds = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admin/ads', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAds(response.data.ads);
    } catch (err) {
      console.error('Error fetching ads:', err.message);
      setError('Failed to fetch ads. Please try again later.');
    }
  };

  const handleSetPrice = async (adId, price) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/admin/ads/${adId}/set-price`,
        { adminPrice: price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Price set successfully!');
      fetchAds(); // Refresh the list after updating
    } catch (err) {
      console.error('Error setting price:', err.message);
      alert('Failed to set price. Please try again.');
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Manage Ads
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ads.map((ad) => (
            <TableRow key={ad._id}>
              <TableCell>{ad.title}</TableCell>
              <TableCell>{ad.description}</TableCell>
              <TableCell>{ad.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => {
                    const price = prompt('Enter the price for this ad:');
                    if (price) handleSetPrice(ad._id, price);
                  }}
                >
                  Set Price
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManageAds;
