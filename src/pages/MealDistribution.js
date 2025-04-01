import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

function MealDistribution() {
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
      date: '2024-03-15',
      location: 'Community Center A',
      mealsServed: 150,
      volunteers: 8,
      notes: 'Regular distribution',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-03-14',
      location: 'School B',
      mealsServed: 200,
      volunteers: 10,
      notes: 'Special event',
      status: 'Pending'
    },
  ]);

  const [formData, setFormData] = useState({
    date: '',
    location: '',
    mealsServed: '',
    volunteers: '',
    notes: '',
    status: 'Pending'
  });

  const handleClickOpen = (distribution = null) => {
    if (distribution) {
      setFormData(distribution);
      setSelectedId(distribution.id);
      setIsEditing(true);
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        location: '',
        mealsServed: '',
        volunteers: '',
        notes: '',
        status: 'Pending'
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
      date: '',
      location: '',
      mealsServed: '',
      volunteers: '',
      notes: '',
      status: 'Pending'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.date || !formData.location || !formData.mealsServed) {
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
        mealsServed: Number(formData.mealsServed),
        volunteers: Number(formData.volunteers),
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
      message: `Distribution marked as ${newStatus}`,
      severity: 'success'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Meals Distribution</Typography>
        <Button 
          variant="contained" 
          onClick={() => handleClickOpen()}
          startIcon={<AddIcon />}
          sx={{
            bgcolor: 'rgb(186, 230, 253)',
            color: '#000000',
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Meals Served</TableCell>
              <TableCell>Volunteers</TableCell>
              <TableCell>Status</TableCell>
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
                <TableCell>
                  <Chip 
                    label={distribution.status}
                    color={getStatusColor(distribution.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{distribution.notes}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small"
                      onClick={() => handleClickOpen(distribution)}
                      sx={{ color: '#1976d2' }}
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
                    {distribution.status === 'Pending' && (
                      <>
                        <IconButton
                          size="small"
                          onClick={() => handleStatusChange(distribution.id, 'Completed')}
                          sx={{ color: 'success.main' }}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleStatusChange(distribution.id, 'Cancelled')}
                          sx={{ color: 'error.main' }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Meals Served"
                type="number"
                name="mealsServed"
                value={formData.mealsServed}
                onChange={handleChange}
                required
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
              <TextField
                fullWidth
                label="Volunteers"
                type="number"
                name="volunteers"
                value={formData.volunteers}
                onChange={handleChange}
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

export default MealDistribution; 