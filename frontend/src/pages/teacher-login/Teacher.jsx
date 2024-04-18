import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/teachers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherEmail,
          teacherPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('teacherId', data._id);
        localStorage.setItem('teacherEmail', data.email);
        console.log("login success")
        navigate('/teacher-dashboard'); // Navigate to dashboard or any other route after successful login
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
          Teacher Login
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
                id="teacherEmail"
                type="email"
                label="Email"
                variant="outlined"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="teacherPassword"
                type="password"
                label="Password"
                variant="outlined"
                value={teacherPassword}
                onChange={(e) => setTeacherPassword(e.target.value)}
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
            New Teacher? 
            <Button component={Link} to="/teacher-signup" color="primary">
              Please Signup
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
