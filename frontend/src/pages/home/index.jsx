import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Container, Typography } from '@mui/material';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    const teacherId = localStorage.getItem('teacherId');

    if (studentId) {
      navigate('/student-dashboard');
    } else if (teacherId) {
      navigate('/teacher-dashboard');
    }
  }, [navigate]);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h1" gutterBottom>
            Home
          </Typography>
          <Button component={Link} to="/student-login" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
            Student Login
          </Button>
          <Button component={Link} to="/teacher-login" variant="contained" color="primary" fullWidth>
            Teacher Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
