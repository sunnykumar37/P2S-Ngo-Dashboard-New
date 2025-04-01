import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Fade,
  IconButton,
  Container,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  LocalHospital as LocalHospitalIcon,
  EmojiEvents as EmojiEventsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

// Mock data for charts
const donationData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 4500 },
  { name: 'May', amount: 6000 },
  { name: 'Jun', amount: 5500 },
];

const distributionData = [
  { name: 'Food', value: 400 },
  { name: 'Clothes', value: 300 },
  { name: 'Medical', value: 200 },
  { name: 'Education', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showReview, setShowReview] = useState(true);

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Volunteer',
      avatar: 'SJ',
      rating: 5,
      comment: 'The food distribution program has been incredibly impactful. The organization is well-structured and the team is very supportive.',
      category: 'Program Impact',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Donor',
      avatar: 'MC',
      rating: 4,
      comment: 'I appreciate the transparency in how donations are used. The regular updates and reports are very helpful.',
      category: 'Transparency',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Community Member',
      avatar: 'ER',
      rating: 5,
      comment: 'The medical camps organized by the NGO have been a blessing for our community. The healthcare services are much needed.',
      category: 'Healthcare',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Partner Organization',
      avatar: 'DK',
      rating: 5,
      comment: 'Working with this NGO has been a great experience. Their dedication to community service is inspiring.',
      category: 'Partnership',
    },
  ];

  // Rotate reviews every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowReview(false);
      setTimeout(() => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        setShowReview(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handlePreviousReview = () => {
    setShowReview(false);
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) => 
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
      setShowReview(true);
    }, 500);
  };

  const handleNextReview = () => {
    setShowReview(false);
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      setShowReview(true);
    }, 500);
  };

  const currentReview = reviews[currentReviewIndex];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Donations</Typography>
              </Box>
              <Typography variant="h4">$28,000</Typography>
              <Typography color="text.secondary">+12% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Volunteers</Typography>
              </Box>
              <Typography variant="h4">45</Typography>
              <Typography color="text.secondary">+5 new this week</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospitalIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Meals Served</Typography>
              </Box>
              <Typography variant="h4">1,500</Typography>
              <Typography color="text.secondary">+8% from last week</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Events Completed</Typography>
              </Box>
              <Typography variant="h4">12</Typography>
              <Typography color="text.secondary">+2 this month</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Donations
            </Typography>
            <BarChart
              width={700}
              height={300}
              data={donationData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Distribution by Category
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={distributionData}
                cx={150}
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper 
          sx={{ 
            p: 2, 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          }}
        >
          <IconButton
            onClick={handlePreviousReview}
            sx={{
              position: 'absolute',
              left: 4,
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
              '&:hover': { 
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,1)'
              },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 1,
              color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Fade in={showReview} timeout={500}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              maxWidth: '85%',
              mx: 'auto',
              py: 0.5,
            }}>
              <Avatar 
                sx={{ 
                  width: 35, 
                  height: 35, 
                  mr: 1.5,
                  border: '2px solid',
                  borderColor: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                {currentReview.avatar}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.25 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mr: 1, 
                      fontWeight: 600,
                      color: (theme) => theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                    }}
                  >
                    {currentReview.name}
                  </Typography>
                  <Chip
                    label={currentReview.role}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ height: '18px', fontSize: '0.7rem' }}
                  />
                </Box>
                <Rating 
                  value={currentReview.rating} 
                  readOnly 
                  size="small" 
                  sx={{ 
                    mb: 0.25, 
                    transform: 'scale(0.7)', 
                    transformOrigin: 'left',
                    '& .MuiRating-icon': {
                      color: '#ffb400',
                    }
                  }} 
                />
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 0.25,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontSize: '0.75rem',
                    lineHeight: 1.3,
                    color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'inherit',
                  }}
                >
                  {currentReview.comment}
                </Typography>
                <Chip
                  label={currentReview.category}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  sx={{ height: '18px', fontSize: '0.7rem' }}
                />
              </Box>
            </Box>
          </Fade>

          <IconButton
            onClick={handleNextReview}
            sx={{
              position: 'absolute',
              right: 4,
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
              '&:hover': { 
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,1)'
              },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 1,
              color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Paper>
      </Container>
    </Box>
  );
}

export default Dashboard; 