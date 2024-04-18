import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import ViewAllCourse from '../view-all-courses/ViewAllCourse';
import EnrolledCourses from '../enrolled-courses/EnrolledCourses';
import StudentProfileCard from '../profile-cards/StudentProfileCard';


function StudentDashboard() {
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState(null);
  const isLoggedIn = localStorage.getItem('studentId');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const studentId = localStorage.getItem('studentId');
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${studentId}`);
        console.log(response)
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, []);

  const handleLogout = () => {
    // Perform logout action, such as clearing local storage
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('studentToken');
    // Redirect to student login page
    navigate('/student-login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>

      {studentDetails && (
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <StudentProfileCard
              studentName={studentDetails.name}
              studentEmail={studentDetails.email}
              profilePic={studentDetails.profilePic}
            />
          </Grid>
        </Grid>
      )}
      
      <br />
      <ViewAllCourse />
      <br />
      <EnrolledCourses />
    </div>
  );
}

export default StudentDashboard;
