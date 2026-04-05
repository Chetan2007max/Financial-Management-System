import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import { Shield, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 300, color: '#333333', textAlign: 'center', mb: 4 }}>
            AI Financial Advisor
          </Typography>
          <Typography variant="h5" sx={{ color: '#666666', textAlign: 'center', mb: 6, maxWidth: 600 }}>
            Unlock your financial potential with personalized AI-driven insights and goal-based strategies.
          </Typography>
        </motion.div>
        <Grid container spacing={4} sx={{ maxWidth: 800 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Shield size={24} color="#FF6B35" />
                  <Typography variant="h6" sx={{ ml: 1, color: '#FF6B35' }}>Risk Management</Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  All recommendations are for informational purposes only. Consult a financial advisor before making decisions.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Activity size={24} color="#4A90E2" />
                  <Typography variant="h6" sx={{ ml: 1, color: '#4A90E2' }}>Reliability & Security</Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  Powered by advanced ML models with 99.9% uptime. Your data is encrypted and never shared.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          sx={{ mt: 6, display: 'flex', gap: 4 }}
        >
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #FF6B35 30%, #4A90E2 90%)',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
            }}
            onClick={() => navigate('/advisor')}
          >
            Financial Advisor
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#4A90E2',
              color: '#4A90E2',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: '#4A90E2',
                color: 'white',
              },
            }}
            onClick={() => navigate('/goal')}
          >
            Goal Planner
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}

export default Home;
