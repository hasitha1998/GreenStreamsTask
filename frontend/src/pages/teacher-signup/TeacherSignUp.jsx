import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';

const TeacherSignup = () => {
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('teacherName', teacherName);
      formData.append('teacherEmail', teacherEmail);
      formData.append('teacherPassword', teacherPassword);
      formData.append('profilePic', profilePic);

      const response = await fetch('http://localhost:5000/api/teachers/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Parse response body as JSON
        console.log(data);
        navigate('/teacher-login'); // Redirect to login page after successful signup
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
          Teacher Signup
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
                id="teacherName"
                type="text"
                label="Name"
                variant="outlined"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                required
              />
            </Grid>
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

export default TeacherSignup;
