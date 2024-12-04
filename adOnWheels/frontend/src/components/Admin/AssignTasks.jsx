import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignTasks = () => {
  const navigate = useNavigate();

  const [taskDetails, setTaskDetails] = useState({
    adId: '',
    bodyShopId: '',
    description: '',
  });
  const [approvedAds, setApprovedAds] = useState([]);
  const [bodyShops, setBodyShops] = useState([]);
  const [message, setMessage] = useState('');

  const fetchApprovedAds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/admin/ads?status=Approved', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApprovedAds(
        response.data.ads.map((adObj) => ({
          id: adObj.ad._id,
          title: adObj.ad.title,
        }))
      );
    } catch (err) {
      console.error('Error fetching approved ads:', err.message);
    }
  };

  const fetchBodyShops = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/admin/bodyshops', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBodyShops(
        response.data.bodyShops.map((bodyShop) => ({
          id: bodyShop._id,
          name: bodyShop.name,
        }))
      );
    } catch (err) {
      console.error('Error fetching body shops:', err.message);
    }
  };

  useEffect(() => {
    fetchApprovedAds();
    fetchBodyShops();
  }, []);

  const handleChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const assignTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/api/admin/bodyshops/tasks', taskDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setTaskDetails({ adId: '', bodyShopId: '', description: '' });
    } catch (err) {
      console.error('Error assigning task:', err.message);
      setMessage('Failed to assign task. Please try again.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Assign Tasks to Body Shops
      </Typography>

      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)} // Navigates to the previous page
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Dropdown for Approved Ads */}
      <TextField
        select
        label="Select Ad"
        name="adId"
        value={taskDetails.adId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        {approvedAds.map((ad) => (
          <MenuItem key={ad.id} value={ad.id}>
            {ad.title}
          </MenuItem>
        ))}
      </TextField>

      {/* Dropdown for Body Shops */}
      <TextField
  select
  label="Select Body Shop"
  name="bodyShopId"
  value={taskDetails.bodyShopId}
  onChange={handleChange}
  fullWidth
  margin="normal"
>
  {bodyShops.map((bodyShop) => (
    <MenuItem key={bodyShop.id} value={bodyShop.id}>
      {`${bodyShop.name} (${bodyShop.id.slice(-5)})`}
    </MenuItem>
  ))}
</TextField>


      {/* Text Area for Task Description */}
      <TextField
        label="Task Description"
        name="description"
        value={taskDetails.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />

      {/* Assign Button */}
      <Button variant="contained" onClick={assignTask} sx={{ mt: 2 }}>
        Assign Task
      </Button>

      {/* Message Display */}
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default AssignTasks;
