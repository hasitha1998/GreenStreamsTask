import React, { useState, useEffect } from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherViewAllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3; // Number of courses to display per page

  // Get teacher ID from local storage
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses/viewAll');
        const allCourses = response.data;

        // Filter courses by teacher ID
        const filteredCourses = allCourses.filter(course => course.teacherId === teacherId);

        setCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [teacherId]);

  // Calculate index of the first and last course for the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ marginLeft: 5 }} gutterBottom>
        All Courses
      </Typography>
      <TableContainer component={Paper} sx={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCourses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>${course.amount}</TableCell>
                <TableCell>{course.teacherId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }).map((_, index) => (
          <Button key={index} onClick={() => paginate(index + 1)}>{index + 1}</Button>
        ))}
      </div>
    </div>
  );
};

export default TeacherViewAllCourse;
