import React, { useState } from 'react';
import { Box, Typography, Button, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const UpdateAdStatus = () => {
  const [status, setStatus] = useState('');
  const [selectedAd, setSelectedAd] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateStatus = async () => {
    try {
      await axios.patch(
        `http://localhost:5001/api/publishers/ads/${selectedAd}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage('Status updated successfully!');
    } catch (err) {
      console.error('Error updating status:', err.message);
      setMessage('Failed to update status. Please try again later.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Update Ad Status
      </Typography>
      <Select
        value={selectedAd}
        onChange={(e) => setSelectedAd(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          Select an Ad
        </MenuItem>
        {/* Example Ad Options */}
        <MenuItem value="ad1">Ad 1</MenuItem>
        <MenuItem value="ad2">Ad 2</MenuItem>
      </Select>
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          Select Status
        </MenuItem>
        <MenuItem value="Accepted">Accepted</MenuItem>
        <MenuItem value="Declined">Declined</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleUpdateStatus}>
        Update Status
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default UpdateAdStatus;
