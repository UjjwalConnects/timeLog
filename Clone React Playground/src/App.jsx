import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Fade,
  Slide,
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { AccessTime, ExitToApp, Calculate, Refresh } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const theme = createTheme({
  palette: {
    primary: { main: '#7c4dff' },
    secondary: { main: '#ff4081' },
  },
});

const AnimatedPaper = styled(Paper)({
  background: 'linear-gradient(45deg, #ffeb3b 30%, #ff9800 90%)', // Bright yellow-orange gradient
  animation: `${gradientAnimation} 10s ease infinite`,
  backgroundSize: '400% 400%',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0 8px 20px rgba(255, 165, 0, 0.5)', // Soft orange glow
});

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': { color: theme.palette.primary.main },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': { borderColor: theme.palette.primary.main },
    '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
  },
});

export function App() {
  const [completedTime, setCompletedTime] = useState(null); // Combined hours and minutes
  const [lastBreakTime, setLastBreakTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState('');
  const [error, setError] = useState('');

  const calculateLogoutTime = () => {
    if (!completedTime || !lastBreakTime) {
      setError('Please provide both completed time and last break time.');
      return;
    }

    const requiredHours = 8;
    const requiredMinutes = 30;

    // Extract hours and minutes from completedTime
    const completedHrs = completedTime.hour();
    const completedMins = completedTime.minute();

    // Calculate remaining time
    let remainingHours = requiredHours - completedHrs;
    let remainingMinutes = requiredMinutes - completedMins;

    if (remainingMinutes < 0) {
      remainingMinutes += 60;
      remainingHours -= 1;
    }

    // Extract hours and minutes from lastBreakTime
    const breakHrs = lastBreakTime.hour();
    const breakMins = lastBreakTime.minute();

    // Calculate logout time
    let logoutHrs = breakHrs + remainingHours;
    let logoutMins = breakMins + remainingMinutes;

    if (logoutMins >= 60) {
      logoutMins -= 60;
      logoutHrs += 1;
    }

    // Format logout time
    setLogoutTime(
      `${String(logoutHrs).padStart(2, '0')}:${String(logoutMins).padStart(
        2,
        '0'
      )}`
    );
    setError('');
  };

  const resetForm = () => {
    setCompletedTime(null);
    setLastBreakTime(null);
    setLogoutTime('');
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth='sm'
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatedPaper elevation={6}>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <AccessTime fontSize='large' />
            Logout Time Calculator
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label='Completed Time (HH:MM)'
                  value={completedTime}
                  ampm={false}
                  onChange={newValue => setCompletedTime(newValue)}
                  renderInput={params => (
                    <StyledTextField
                      {...params}
                      fullWidth
                      error={!!error}
                      helperText={error}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label='Last Break Time (HH:MM)'
                  value={lastBreakTime}
                  onChange={newValue => setLastBreakTime(newValue)}
                  renderInput={params => (
                    <StyledTextField
                      {...params}
                      fullWidth
                      error={!!error}
                      helperText={error}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Box
            sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}
          >
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#ff9800',
                color: 'white',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: '10px',
                '&:hover': { backgroundColor: '#e68900' },
              }}
              onClick={calculateLogoutTime}
              startIcon={<Calculate />}
            >
              Calculate
            </Button>

            <Button
              variant='outlined'
              sx={{
                borderColor: '#f50057',
                color: '#f50057',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#f50057',
                  color: 'white',
                },
              }}
              onClick={resetForm}
              startIcon={<Refresh />}
            >
              Reset
            </Button>
          </Box>

          {logoutTime && (
            <Fade in={!!logoutTime}>
              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  <ExitToApp sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Logout Time:
                </Typography>
                <Slide direction='up' in={!!logoutTime}>
                  <Typography
                    variant='h3'
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      mt: 1,
                    }}
                  >
                    {logoutTime} PM
                  </Typography>
                </Slide>
              </Box>
            </Fade>
          )}
        </AnimatedPaper>
      </Container>
    </ThemeProvider>
  );
}
