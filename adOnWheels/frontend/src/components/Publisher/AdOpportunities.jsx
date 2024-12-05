import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const AdOpportunities = () => {
  const [adOpportunities, setAdOpportunities] = useState([]);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const fetchAdOpportunities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/publishers/ads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdOpportunities(response.data.adAssignments);
    } catch (err) {
      setError('Failed to fetch ad opportunities. Please try again later.');
    }
  };

  const handleAdStatus = async (adAssignmentId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:5001/api/publishers/ads/${adAssignmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbar({
        open: true,
        message: `Ad ${status.toLowerCase()} successfully!`,
        severity: 'success',
      });
      fetchAdOpportunities(); // Refresh opportunities
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to update ad status. Please try again.',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
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
            <TableCell>Payment</TableCell>
            <TableCell>Admin Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adOpportunities.length > 0 ? (
            adOpportunities.map((ad) => (
              <TableRow key={ad._id}>
                <TableCell>{ad.adId.title}</TableCell>
                <TableCell>${ad.payment}</TableCell>
                <TableCell>{ad.adminId?.name || 'Admin'}</TableCell>
                <TableCell>{ad.status}</TableCell>
                <TableCell>
                  {ad.status === 'Pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleAdStatus(ad._id, 'Accepted')}
                        sx={{ mr: 1 }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleAdStatus(ad._id, 'Declined')}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No ad opportunities available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdOpportunities;
