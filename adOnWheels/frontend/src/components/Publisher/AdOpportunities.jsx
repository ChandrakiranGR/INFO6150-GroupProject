import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

const AdOpportunities = () => {
  const [adOpportunities, setAdOpportunities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdOpportunities = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/publishers/ads', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAdOpportunities(response.data.adAssignments);
      } catch (err) {
        console.error('Error fetching ad opportunities:', err.message);
        setError('Failed to fetch ad opportunities. Please try again later.');
      }
    };
    fetchAdOpportunities();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Ad Opportunities
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ad Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Assigned At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adOpportunities.map((ad) => (
            <TableRow key={ad._id}>
              <TableCell>{ad.adId?.title || 'N/A'}</TableCell>
              <TableCell>{ad.status}</TableCell>
              <TableCell>${ad.payment}</TableCell>
              <TableCell>{new Date(ad.assignedAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdOpportunities;
