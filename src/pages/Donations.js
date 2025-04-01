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
  MenuItem,
  Chip,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';

function Donations() {
  const [donations, setDonations] = useState([
    {
      id: 1,
      donorName: 'John Doe',
      amount: '50 kg',
      type: 'Food',
      status: 'Received',
      date: '2024-03-15',
      notes: 'Monthly donation',
    },
    {
      id: 2,
      donorName: 'Jane Smith',
      amount: '100 units',
      type: 'Vegetables',
      status: 'Pending',
      date: '2024-03-14',
      notes: 'Fresh vegetables donation',
    },
    {
      id: 3,
      donorName: 'Mike Johnson',
      amount: '200 kg',
      type: 'Grain',
      status: 'Distributed',
      date: '2024-03-13',
      notes: 'Emergency relief fund',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [openOtherDialog, setOpenOtherDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [newDonation, setNewDonation] = useState({
    donorName: '',
    amount: '',
    type: 'Food',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [otherType, setOtherType] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewDonation({
      donorName: '',
      amount: '',
      type: 'Food',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleOtherDialogOpen = () => {
    setOpenOtherDialog(true);
  };

  const handleOtherDialogClose = () => {
    setOpenOtherDialog(false);
    setOtherType('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtherTypeSubmit = () => {
    if (!otherType.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid type',
        severity: 'error',
      });
      return;
    }
    setNewDonation(prev => ({
      ...prev,
      type: otherType
    }));
    handleOtherDialogClose();
  };

  const handleSubmit = () => {
    if (!newDonation.donorName || !newDonation.amount || !newDonation.type) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    const donation = {
      id: donations.length + 1,
      ...newDonation,
      status: 'Pending',
    };

    setDonations(prev => [...prev, donation]);
    setSnackbar({
      open: true,
      message: 'Donation added successfully',
      severity: 'success',
    });
    handleClose();
  };

  const handleStatusChange = (id, newStatus) => {
    setDonations(prev =>
      prev.map(donation =>
        donation.id === id ? { ...donation, status: newStatus } : donation
      )
    );
    setSnackbar({
      open: true,
      message: `Donation status updated to ${newStatus}`,
      severity: 'success',
    });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Distributed':
        return 'info';
      default:
        return 'default';
    }
  };

  const filteredDonations = donations.filter(donation => {
    switch (selectedTab) {
      case 0: // All
        return true;
      case 1: // Received
        return donation.status === 'Received';
      case 2: // Pending
        return donation.status === 'Pending';
      case 3: // Distributed
        return donation.status === 'Distributed';
      default:
        return true;
    }
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Donations</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Donation
        </Button>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        variant="fullWidth"
      >
        <Tab label="All" />
        <Tab label="Received" />
        <Tab label="Pending" />
        <Tab label="Distributed" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Donor Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.donorName}</TableCell>
                <TableCell>{donation.amount}</TableCell>
                <TableCell>{donation.type}</TableCell>
                <TableCell>
                  <Chip
                    label={donation.status}
                    color={getStatusColor(donation.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{donation.date}</TableCell>
                <TableCell>{donation.notes}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {donation.status !== 'Received' && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={() => handleStatusChange(donation.id, 'Received')}
                      >
                        Mark Received
                      </Button>
                    )}
                    {donation.status === 'Received' && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="info"
                        onClick={() => handleStatusChange(donation.id, 'Distributed')}
                      >
                        Mark Distributed
                      </Button>
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
            bgcolor: 'background.default',
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
                '&.Mui-focused': {
                  color: 'text.primary',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: 'text.primary',
              },
            },
          }
        }}
      >
        <DialogTitle>Add New Donation</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Donor Name"
              name="donorName"
              value={newDonation.donorName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Quantity"
              name="amount"
              value={newDonation.amount}
              onChange={handleInputChange}
              fullWidth
              required
              helperText="Enter quantity with unit (e.g., 50 kg, 100 units)"
            />
            <TextField
              select
              label="Type"
              name="type"
              value={newDonation.type}
              onChange={handleInputChange}
              fullWidth
              required
            >
              <MenuItem value="Food">Food Items</MenuItem>
              <MenuItem value="Vegetables">Fresh Vegetables</MenuItem>
              <MenuItem value="Fruits">Fresh Fruits</MenuItem>
              <MenuItem value="Grain">Grains & Pulses</MenuItem>
              <MenuItem value="Other" onClick={handleOtherDialogOpen}>Other</MenuItem>
            </TextField>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={newDonation.date}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ 
                  shrink: true 
                }}
                sx={{
                  '& input::-webkit-calendar-picker-indicator': {
                    opacity: 1,
                    display: 'block',
                    background: 'transparent',
                    cursor: 'pointer',
                    height: '20px',
                    width: '20px',
                    position: 'absolute',
                    right: '10px',
                    filter: 'invert(1)',
                  }
                }}
              />
              <CalendarIcon 
                sx={{ 
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'text.secondary',
                  zIndex: 1,
                }}
              />
            </Box>
            <TextField
              label="Notes"
              name="notes"
              value={newDonation.notes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            Add Donation
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openOtherDialog} onClose={handleOtherDialogClose}>
        <DialogTitle>Specify Other Type</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              label="Enter Type"
              value={otherType}
              onChange={(e) => setOtherType(e.target.value)}
              fullWidth
              required
              helperText="Enter the type of food item"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOtherDialogClose}>Cancel</Button>
          <Button onClick={handleOtherTypeSubmit} variant="contained" color="primary">
            Add Type
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

export default Donations; 