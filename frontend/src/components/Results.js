import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { TrendingUp, Target, Activity, PieChart, AlertCircle } from 'lucide-react';
import Chart from 'react-apexcharts';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, data } = location.state || {};

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Paper sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AlertCircle size={64} color="#F43F5E" />
          <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
            No Data Available
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 4 }}>
            Please fill out the form to get your personalized recommendations.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(45deg, #FF6B35 30%, #4A90E2 90%)',
              color: 'white',
              px: 4,
            }}
          >
            Go to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  const getColor = (key) => {
    if (key.toLowerCase().includes('expense') || key.toLowerCase().includes('luxury')) return '#F43F5E';
    if (key.toLowerCase().includes('investment') || key.toLowerCase().includes('growth')) return '#6366F1';
    return '#10B981';
  };

  const renderCard = (key, value) => {
    if (key === 'health_score' && typeof value === 'number') {
      return (
        <Grid item xs={12} md={6} key={key}>
          <Paper sx={{ p: 4, height: 300 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Activity size={24} color="#10B981" />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Financial Health Score
              </Typography>
            </Box>
            <Chart
              options={{
                chart: { type: 'radialBar' },
                plotOptions: {
                  radialBar: {
                    hollow: { size: '70%' },
                    dataLabels: {
                      name: { show: false },
                      value: {
                        fontSize: '24px',
                        color: '#10B981',
                        formatter: (val) => `${val}%`
                      }
                    }
                  }
                },
                colors: ['#10B981'],
                labels: ['Health Score']
              }}
              series={[value]}
              type="radialBar"
              height={200}
            />
          </Paper>
        </Grid>
      );
    }

    if ((key === 'monthly_investment_allocation' || key === 'monthly_investment_plan') && typeof value === 'object') {
      const series = Object.values(value);
      const labels = Object.keys(value);
      return (
        <Grid item xs={12} md={6} key={key}>
          <Paper sx={{ p: 4, height: 300 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PieChart size={24} color="#6366F1" />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {key.replace(/_/g, ' ').toUpperCase()}
              </Typography>
            </Box>
            <Chart
              options={{
                chart: { type: 'donut' },
                labels,
                colors: ['#10B981', '#6366F1', '#F43F5E', '#F59E0B'],
                legend: { position: 'bottom' },
                dataLabels: { enabled: false }
              }}
              series={series}
              type="donut"
              height={200}
            />
          </Paper>
        </Grid>
      );
    }

    return (
      <Grid item xs={12} md={6} key={key}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" component="h2" sx={{ color: getColor(key), mb: 1 }}>
            {key.replace(/_/g, ' ').toUpperCase()}
          </Typography>
          <Typography variant="body1">
            {Array.isArray(value) ? value.join(', ') : typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
          </Typography>
        </Paper>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        {type === 'advisor' ? <TrendingUp size={32} color="#FF6B35" /> : <Target size={32} color="#4F46E5" />}
        <Typography variant="h4" component="h1" sx={{ ml: 2 }}>
          {type === 'advisor' ? 'Financial Advisor Results' : 'Goal Planning Results'}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {Object.entries(data).map(([key, value]) => renderCard(key, value))}
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            background: 'linear-gradient(45deg, #FF6B35 30%, #4A90E2 90%)',
            color: 'white',
            px: 4,
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default Results;
