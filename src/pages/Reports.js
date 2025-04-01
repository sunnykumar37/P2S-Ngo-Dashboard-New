import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as TableIcon,
  Assessment as ReportIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function Reports() {
  const [reportType, setReportType] = useState('meals');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [generatedData, setGeneratedData] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Sample data - replace with your actual data fetching logic
  const getMealData = () => [
    { date: '2024-03-15', location: 'Center A', mealsServed: 150, volunteers: 8 },
    { date: '2024-03-14', location: 'Center B', mealsServed: 200, volunteers: 10 },
    { date: '2024-03-13', location: 'Center C', mealsServed: 175, volunteers: 7 },
  ];

  const getDonationData = () => [
    { date: '2024-03-15', donor: 'John Doe', amount: 1000, type: 'Money' },
    { date: '2024-03-14', donor: 'Jane Smith', amount: 500, type: 'Food' },
    { date: '2024-03-13', donor: 'Bob Wilson', amount: 750, type: 'Money' },
  ];

  const handleGenerateReport = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      setSnackbar({
        open: true,
        message: 'Please select both start and end dates',
        severity: 'error'
      });
      return;
    }

    const data = reportType === 'meals' ? getMealData() : getDonationData();
    setGeneratedData(data);

    setSnackbar({
      open: true,
      message: 'Report generated successfully',
      severity: 'success'
    });
  };

  const handleDownloadPDF = () => {
    if (!generatedData) {
      setSnackbar({
        open: true,
        message: 'Please generate a report first',
        severity: 'error'
      });
      return;
    }

    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text(`${reportType === 'meals' ? 'Meals Distribution' : 'Donations'} Report`, 14, 15);
    doc.setFontSize(12);
    doc.text(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, 14, 25);

    const columns = reportType === 'meals' 
      ? ['Date', 'Location', 'Meals Served', 'Volunteers']
      : ['Date', 'Donor', 'Amount', 'Type'];

    const rows = generatedData.map(item => 
      reportType === 'meals'
        ? [item.date, item.location, item.mealsServed.toString(), item.volunteers.toString()]
        : [item.date, item.donor, item.amount.toString(), item.type]
    );

    doc.autoTable({
      startY: 35,
      head: [columns],
      body: rows,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(`${reportType}-report-${new Date().toISOString().split('T')[0]}.pdf`);
    
    setSnackbar({
      open: true,
      message: 'PDF downloaded successfully',
      severity: 'success'
    });
  };

  const handleDownloadCSV = () => {
    if (!generatedData) {
      setSnackbar({
        open: true,
        message: 'Please generate a report first',
        severity: 'error'
      });
      return;
    }

    const headers = reportType === 'meals'
      ? ['Date', 'Location', 'Meals Served', 'Volunteers']
      : ['Date', 'Donor', 'Amount', 'Type'];

    const rows = generatedData.map(item => 
      reportType === 'meals'
        ? [item.date, item.location, item.mealsServed, item.volunteers]
        : [item.date, item.donor, item.amount, item.type]
    );

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportType}-report-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSnackbar({
      open: true,
      message: 'CSV downloaded successfully',
      severity: 'success'
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Report Type"
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value);
                setGeneratedData(null);
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                },
              }}
            >
              <MenuItem value="meals">Meals Distribution Report</MenuItem>
              <MenuItem value="donations">Donations Report</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={dateRange.startDate}
              onChange={(e) => {
                setDateRange({ ...dateRange, startDate: e.target.value });
                setGeneratedData(null);
              }}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={dateRange.endDate}
              onChange={(e) => {
                setDateRange({ ...dateRange, endDate: e.target.value });
                setGeneratedData(null);
              }}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<ReportIcon />}
            onClick={handleGenerateReport}
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
            Generate Report
          </Button>
          <Button
            variant="contained"
            startIcon={<PdfIcon />}
            onClick={handleDownloadPDF}
            disabled={!generatedData}
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
              '&.Mui-disabled': {
                bgcolor: 'rgba(186, 230, 253, 0.5)',
                color: 'rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<TableIcon />}
            onClick={handleDownloadCSV}
            disabled={!generatedData}
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
              '&.Mui-disabled': {
                bgcolor: 'rgba(186, 230, 253, 0.5)',
                color: 'rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            Download CSV
          </Button>
        </Box>

        {generatedData && (
          <Box sx={{ mt: 4, bgcolor: '#fff', borderRadius: 1, p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#000', fontWeight: 600 }}>
              Generated Report Preview
            </Typography>
            <TableContainer 
              component={Paper} 
              sx={{ 
                maxHeight: 440,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '& .MuiTableCell-head': {
                  backgroundColor: 'rgb(186, 230, 253)',
                  color: '#000000',
                  fontWeight: 600,
                },
                '& .MuiTableCell-body': {
                  color: '#000000',
                },
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {reportType === 'meals' ? (
                      <>
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Meals Served</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Volunteers</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Donor</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {generatedData.map((row, index) => (
                    <TableRow 
                      key={index}
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'rgba(186, 230, 253, 0.05)',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(186, 230, 253, 0.1)',
                        },
                      }}
                    >
                      {reportType === 'meals' ? (
                        <>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.location}</TableCell>
                          <TableCell align="right">{row.mealsServed}</TableCell>
                          <TableCell align="right">{row.volunteers}</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.donor}</TableCell>
                          <TableCell align="right">${row.amount}</TableCell>
                          <TableCell>{row.type}</TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Donations
              </Typography>
              <Typography variant="h4">$28,000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Distributed Items
              </Typography>
              <Typography variant="h4">1,500</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Volunteers
              </Typography>
              <Typography variant="h4">45</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Locations Covered
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

export default Reports; 