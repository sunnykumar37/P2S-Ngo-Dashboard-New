import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Donations from './pages/Donations';
import MealDistribution from './pages/MealDistribution';
import DistributionTracker from './pages/DistributionTracker';
import Reports from './pages/Reports';
import Communication from './pages/Communication';
import Profile from './pages/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout onThemeToggle={() => setDarkMode(!darkMode)} darkMode={darkMode}>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/donations" element={<Donations />} />
            <Route exact path="/meals-distribution" element={<MealDistribution />} />
            <Route exact path="/distribution-tracker" element={<DistributionTracker />} />
            <Route exact path="/reports" element={<Reports />} />
            <Route exact path="/communication" element={<Communication />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 