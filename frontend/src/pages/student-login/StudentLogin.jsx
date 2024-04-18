import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentEmail,
          studentPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('studentToken', data.token);
        localStorage.setItem('studentId', data._id);
        localStorage.setItem('studentEmail', data.email);
        navigate('/student-dashboard'); // Redirect to dashboard or any other route after successful login
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Student Login
        </Typography>
        <form onSubmit={handleLogin}>
          {error && (
            <Typography variant="body1" color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="studentEmail"
                type="email"
                label="Email"
                variant="outlined"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="studentPassword"
                type="password"
                label="Password"
                variant="outlined"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            New Student? 
            <Button component={Link} to="/student-signup" color="primary">
              Please Signup
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default StudentLogin;
