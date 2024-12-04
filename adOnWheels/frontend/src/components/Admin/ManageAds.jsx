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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageAds = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [adminPrice, setAdminPrice] = useState('');
  const navigate = useNavigate(); // For navigation

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching ads with token:', token);

      const response = await axios.get('http://localhost:5001/api/admin/ads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Ads API response:', response.data);

      setAds(
        response.data.ads.map((adObj) => ({
          ...adObj.ad,
          advertiserName: adObj.advertiserName,
          advertiserEmail: adObj.email,
          advertiserBudget: adObj.ad.budget,
          advertiserId: adObj.advertiserId,
        }))
      );
    } catch (err) {
      console.error('Error fetching ads:', err.message);
      console.error('Error details:', err.response?.data || 'No additional error details');
      setError('Failed to fetch ads. Please try again later.');
    }
  };

  const handleSetPrice = async () => {
    try {
      if (!adminPrice || parseFloat(adminPrice) <= 0) {
        alert('Price must be greater than 0.');
        return;
      }

      const token = localStorage.getItem('token');
      console.log(`Setting price for adId: ${selectedAd?._id}, price: ${adminPrice}`);

      await axios.patch(
        `http://localhost:5001/api/admin/ads/${selectedAd._id}/set-price`,
        { advertiserId: selectedAd.advertiserId, adminPrice: parseFloat(adminPrice) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Price set successfully!');
      setOpenDialog(false);
      setAdminPrice(''); // Reset input field
      fetchAds(); // Refresh ads after setting price
    } catch (err) {
      console.error('Error setting price:', err.message);
      console.error('Error details:', err.response?.data || 'No additional error details');
      alert('Failed to set price. Please try again.');
    }
  };

  useEffect(() => {
    console.log('ManageAds mounted');
    fetchAds();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate(-1)} // Navigates to the previous page
      >
        Back
      </Button>

      <Typography variant="h4" mb={3}>
        Manage Ads
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Advertiser Name</TableCell>
            <TableCell>Advertiser Email</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ads.length > 0 ? (
            ads.map((ad) => (
              <TableRow key={ad._id}>
                <TableCell>{ad.advertiserName}</TableCell>
                <TableCell>{ad.advertiserEmail}</TableCell>
                <TableCell>{ad.title}</TableCell>
                <TableCell>{ad.description}</TableCell>
                <TableCell>${ad.advertiserBudget}</TableCell>
                <TableCell>{ad.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSelectedAd(ad); // Set selected ad
                      setOpenDialog(true); // Open dialog
                    }}
                  >
                    Set Price
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No ads available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog for setting price */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Set Price for Ad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the price for the ad titled <strong>{selectedAd?.title}</strong>.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Admin Price"
            type="number"
            fullWidth
            variant="outlined"
            value={adminPrice}
            onChange={(e) => setAdminPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSetPrice}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAds;
