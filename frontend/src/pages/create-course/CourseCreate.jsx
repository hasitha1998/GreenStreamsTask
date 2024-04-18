import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import TeacherViewAllCourse from '../teacher-view-course/TeacherViewAllCourse';

const CourseCreate = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    amount: '',
  });

  // Retrieve teacher ID from local storage
  const teacherId = localStorage.getItem('teacherId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/courses/create', {
        ...courseData,
        teacherId,
      });
      console.log('Course created successfully:', courseData);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Course
      </Typography>
      <form onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Course Name"
              variant="outlined"
              value={courseData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="amount"
              label="Amount"
              variant="outlined"
              type="number"
              value={courseData.amount}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Course
        </Button>
      </form>
      
    </Container>
    

    
  );
};

export default CourseCreate;
