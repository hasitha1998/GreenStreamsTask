import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import TeacherProfileCard from '../profile-cards/TeacherProfileCard'; // You'll need to create this component
import TeacherViewAllCourse from '../teacher-view-course/TeacherViewAllCourse';
import CourseCreate from '../create-course/CourseCreate';



function TeacherDashboard() {
  const navigate = useNavigate();
  const [teacherDetails, setTeacherDetails] = useState(null);
  const isLoggedIn = localStorage.getItem('teacherId'); // Get teacher ID from local storage

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const teacherId = localStorage.getItem('teacherId');
      try {
        const response = await axios.get(`http://localhost:5000/api/teachers/${teacherId}`);
        console.log(response);
        setTeacherDetails(response.data);
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    };

    fetchTeacherDetails();
  }, []);

  const handleLogout = () => {
    // Perform logout action, such as clearing local storage
    localStorage.removeItem('teacherId');
    localStorage.removeItem('teacherEmail');
    localStorage.removeItem('token');

    // Redirect to teacher login page
    navigate('/teacher-login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teacher Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>

      {teacherDetails && (
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <TeacherProfileCard
              teacherName={teacherDetails.name}
              teacherEmail={teacherDetails.email}
              profilePic={teacherDetails.profilePic}
            />
          </Grid>
        </Grid>
      )}
      
      <br />
      <TeacherViewAllCourse /> {/* Display the teacher's courses */}
      <br/>
      <CourseCreate /> {/* Display the teacher's courses */}
    </div>
  );
}

export default TeacherDashboard;
