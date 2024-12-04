import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/publishers/payments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPayments(response.data.payments);
      } catch (err) {
        console.error('Error fetching payment details:', err.message);
        setError('Failed to fetch payment details. Please try again later.');
      }
    };
    fetchPaymentDetails();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Payment Details
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ad Title</TableCell>
            <TableCell>Payment Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>{payment.adId?.title || 'N/A'}</TableCell>
                <TableCell>${payment.payment}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{new Date(payment.updatedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No payment records available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PaymentDetails;
