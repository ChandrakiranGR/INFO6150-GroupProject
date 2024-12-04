import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const AssignTasks = () => {
  const [taskDetails, setTaskDetails] = useState({
    adId: '',
    bodyShopId: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const assignTask = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/admin/bodyshops/tasks', taskDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      <TextField
        label="Ad ID"
        name="adId"
        value={taskDetails.adId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Body Shop ID"
        name="bodyShopId"
        value={taskDetails.bodyShopId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
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
      <Button variant="contained" onClick={assignTask} sx={{ mt: 2 }}>
        Assign Task
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default AssignTasks;
