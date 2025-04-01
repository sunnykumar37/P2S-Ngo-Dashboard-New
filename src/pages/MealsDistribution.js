import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';

function MealsDistribution() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    mealsServed: '',
    volunteers: '',
    notes: '',
  });

  // Mock data
  const distributions = [
    {
      id: 1,
      date: '2024-03-15',
      location: 'Community Center A',
      mealsServed: 150,
      volunteers: 8,
      notes: 'Regular distribution',
    },
    {
      id: 2,
      date: '2024-03-14',
      location: 'School B',
      mealsServed: 200,
      volunteers: 10,
      notes: 'Special event',
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      date: '',
      location: '',
      mealsServed: '',
      volunteers: '',
      notes: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add distribution logic here
    console.log('New distribution:', formData);
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Meals Distribution</Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New Distribution
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Meals Served</TableCell>
              <TableCell>Volunteers</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {distributions.map((distribution) => (
              <TableRow key={distribution.id}>
                <TableCell>{distribution.date}</TableCell>
                <TableCell>{distribution.location}</TableCell>
                <TableCell>{distribution.mealsServed}</TableCell>
                <TableCell>{distribution.volunteers}</TableCell>
                <TableCell>{distribution.notes}</TableCell>
                <TableCell>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Distribution</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Meals Served"
                  type="number"
                  name="mealsServed"
                  value={formData.mealsServed}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Volunteers"
                  type="number"
                  name="volunteers"
                  value={formData.volunteers}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  multiline
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MealsDistribution; 