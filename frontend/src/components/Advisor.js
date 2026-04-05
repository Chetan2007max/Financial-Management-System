import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Stepper, Step, StepLabel, CircularProgress, Snackbar, Alert } from '@mui/material';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const steps = ['Income & Expenses', 'Personal Details'];

function Advisor() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ income: '', expenses: '', age: '' });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep = () => {
    const newErrors = {};
    if (activeStep === 0) {
      if (!formData.income || isNaN(formData.income) || formData.income <= 0) newErrors.income = 'Enter valid income';
      if (!formData.expenses || isNaN(formData.expenses) || formData.expenses < 0) newErrors.expenses = 'Enter valid expenses';
    } else if (activeStep === 1) {
      if (!formData.age || isNaN(formData.age) || formData.age < 18 || formData.age > 100) newErrors.age = 'Enter valid age (18-100)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/recommend/advisor', formData);
      navigate('/results', { state: { type: 'advisor', data: response.data.recommendation } });
    } catch (error) {
      setLoading(false);
      setSnackbar({ open: true, message: 'Error: ' + error.message, severity: 'error' });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DollarSign size={24} color="#FF6B35" />
              <Typography variant="h6" sx={{ ml: 1 }}>Income & Expenses</Typography>
            </Box>
            <TextField
              fullWidth
              label="Monthly Income"
              name="income"
              type="number"
              value={formData.income}
              onChange={handleChange}
              margin="normal" sx={{ mb: 3 }}
              error={!!errors.income}
              helperText={errors.income}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Monthly Expenses"
              name="expenses"
              type="number"
              value={formData.expenses}
              onChange={handleChange}
              margin="normal" sx={{ mb: 3 }}
              error={!!errors.expenses}
              helperText={errors.expenses}
              variant="outlined"
              sx={{ mb: 3 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Calendar size={24} color="#4A90E2" />
              <Typography variant="h6" sx={{ ml: 1 }}>Personal Details</Typography>
            </Box>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              margin="normal" sx={{ mb: 3 }}
              error={!!errors.age}
              helperText={errors.age}
              variant="outlined"
              sx={{ mb: 3 }}
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUp size={32} color="#FF6B35" />
          <Typography variant="h4" component="h1" sx={{ ml: 2 }}>
            Financial Advisor
          </Typography>
        </Box>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #FF6B35 30%, #4A90E2 90%)',
                  color: 'white',
                  px: 4,
                }}
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} /> : null}
              >
                Get Recommendations
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B35 30%, #4A90E2 90%)',
                  color: 'white',
                  px: 4,
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Advisor;
