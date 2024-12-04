import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

const ManagePublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState(null);

  const fetchPublishers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admin/publishers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPublishers(response.data.publishers);
    } catch (err) {
      console.error('Error fetching publishers:', err.message);
      setError('Failed to fetch publishers. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Manage Publishers
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Vehicle Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publishers.map((publisher) => (
            <TableRow key={publisher._id}>
              <TableCell>{publisher.name}</TableCell>
              <TableCell>{publisher.email}</TableCell>
              <TableCell>{publisher.contactNumber}</TableCell>
              <TableCell>
                {publisher.vehicleDetails.vehicleType} - {publisher.vehicleDetails.vehicleNumber}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManagePublishers;
