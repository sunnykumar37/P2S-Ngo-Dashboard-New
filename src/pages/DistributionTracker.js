import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Restaurant as FoodIcon,
} from '@mui/icons-material';

function DistributionTracker() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [distributions, setDistributions] = useState([
    {
      id: 1,
      itemType: 'Rice',
      quantity: '100 kg',
      location: 'Community Center A',
      status: 'delivered',
      date: '2024-03-15',
      notes: 'Monthly rice distribution',
    },
    {
      id: 2,
      itemType: 'Vegetables',
      quantity: '50 kg',
      location: 'Shelter B',
      status: 'in_transit',
      date: '2024-03-14',
      notes: 'Fresh vegetable delivery',
    },
  ]);

  const [formData, setFormData] = useState({
    itemType: '',
    quantity: '',
    location: '',
    status: 'pending',
    date: '',
    notes: '',
  });

  const foodTypes = [
    'Rice',
    'Wheat',
    'Pulses',
    'Vegetables',
    'Fruits',
    'Cooking Oil',
    'Milk',
    'Ready-to-eat Meals',
    'Other Food Items'
  ];

  const handleClickOpen = (distribution = null) => {
    if (distribution) {
      setFormData(distribution);
      setSelectedId(distribution.id);
      setIsEditing(true);
    } else {
      setFormData({
        itemType: '',
        quantity: '',
        location: '',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setSelectedId(null);
    setFormData({
      itemType: '',
      quantity: '',
      location: '',
      status: 'pending',
      date: '',
      notes: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.itemType || !formData.quantity || !formData.location || !formData.date) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    if (isEditing) {
      setDistributions(prev =>
        prev.map(dist =>
          dist.id === selectedId ? { ...formData, id: selectedId } : dist
        )
      );
      setSnackbar({
        open: true,
        message: 'Distribution updated successfully',
        severity: 'success'
      });
    } else {
      const newDistribution = {
        id: Date.now(),
        ...formData,
      };
      setDistributions(prev => [...prev, newDistribution]);
      setSnackbar({
        open: true,
        message: 'Distribution added successfully',
        severity: 'success'
      });
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setDistributions(prev => prev.filter(dist => dist.id !== id));
    setSnackbar({
      open: true,
      message: 'Distribution deleted successfully',
      severity: 'success'
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setDistributions(prev =>
      prev.map(dist =>
        dist.id === id ? { ...dist, status: newStatus } : dist
      )
    );
    setSnackbar({
      open: true,
      message: `Status updated to ${newStatus}`,
      severity: 'success'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'in_transit':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Food Distribution Tracker</Typography>
        <Button 
          variant="contained" 
          onClick={() => handleClickOpen()}
          startIcon={<AddIcon />}
          sx={{
            bgcolor: 'rgb(186, 230, 253)',
            color: 'rgb(24, 25, 25)',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            '&:hover': {
              bgcolor: 'rgb(165, 210, 235)',
            },
            boxShadow: 'none',
          }}
        >
          ADD NEW DISTRIBUTION
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Distributions
            </Typography>
            {distributions.map((distribution) => (
              <Card key={distribution.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FoodIcon />
                      <Typography variant="h6">{distribution.itemType}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleClickOpen(distribution)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(distribution.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography color="textSecondary">
                        Quantity: {distribution.quantity}
                      </Typography>
                      <Typography color="textSecondary">
                        Location: {distribution.location}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography color="textSecondary">
                        Date: {distribution.date}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Typography color="textSecondary">Status:</Typography>
                        <Chip
                          label={getStatusLabel(distribution.status)}
                          color={getStatusColor(distribution.status)}
                          size="small"
                        />
                        {distribution.status !== 'delivered' && (
                          <IconButton
                            size="small"
                            onClick={() => handleStatusChange(distribution.id, 'delivered')}
                            sx={{ color: 'success.main' }}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Grid>
                    {distribution.notes && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                          Notes: {distribution.notes}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#424242',
            color: 'white',
            minWidth: '500px',
          }
        }}
      >
        <DialogTitle>{isEditing ? 'Edit Distribution' : 'Add New Distribution'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              select
              fullWidth
              label="Food Type"
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
              required
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              {foodTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              helperText="e.g., 100 kg, 50 packets"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiFormHelperText-root': {
                  color: 'rgba(255, 255, 255, 0.5)',
                },
              }}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& input::-webkit-calendar-picker-indicator': {
                  filter: 'invert(1)',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in_transit">In Transit</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
            }}
          >
            CANCEL
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: '#1976d2',
              '&:hover': {
                bgcolor: '#1565c0',
              },
            }}
          >
            {isEditing ? 'UPDATE' : 'SAVE'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DistributionTracker; 