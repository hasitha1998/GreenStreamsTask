import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';

const StudentSignup = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('studentName', studentName);
      formData.append('studentEmail', studentEmail);
      formData.append('studentPassword', studentPassword);
      formData.append('profilePic', profilePic);

      const response = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Parse response body as JSON
        console.log(data); 
        navigate('/student-login'); // Redirect to login page after successful signup
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setError('An error occurred while signing up');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Student Signup
        </Typography>
        <form onSubmit={handleSignup}>
          {error && (
            <Typography variant="body1" color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="studentName"
                type="text"
                label="Name"
                variant="outlined"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </Grid>
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
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="profilePic"
                type="file"
                onChange={handleFileChange}
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
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default StudentSignup;
