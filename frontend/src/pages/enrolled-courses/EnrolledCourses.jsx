import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [courseDetails, setCourseDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3;
    const studentId = localStorage.getItem('studentId');
    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/students/${studentId}`);
                const studentData = response.data;

                if (studentData && Array.isArray(studentData.courses)) {
                    setEnrolledCourses(studentData.courses);
                } else {
                    console.error('Enrolled courses not found or invalid format');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudentData();
    }, [studentId]);

    useEffect(() => {
        const fetchCourseDetails = async (courseId) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
                const courseData = response.data;
                setCourseDetails(prevState => ({
                    ...prevState,
                    [courseId]: {
                        name: courseData.name,
                        teacherId: courseData.teacherId
                    }
                }));
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        enrolledCourses.forEach(courseId => {
            fetchCourseDetails(courseId);
        });
    }, [enrolledCourses]);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = enrolledCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleClick = (courseId, courseName, teacherId, studentId) => {
        navigate('/view-one-course', {
            state: {
                courseId: courseId,
                courseName: courseName,
                teacherId: teacherId,
                studentId: studentId
            }
        });
    };

    return (
        <div>
            <h2 className='ml-[2rem]'>Enrolled Courses</h2>
            <Grid container spacing={2}>
                {currentCourses.map(courseId => (
                    <Grid item xs={12} sm={6} md={4} key={courseId}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Course Name: {courseDetails[courseId]?.name}
                                </Typography>
                                <Typography variant="body1">
                                    Course ID: {courseId}
                                </Typography>
                                <Typography variant="body1">
                                    Teacher ID: {courseDetails[courseId]?.teacherId}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleClick(courseId, courseDetails[courseId]?.name, courseDetails[courseId]?.teacherId, studentId)}
                                >
                                    View Course
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {Array.from({ length: Math.ceil(enrolledCourses.length / coursesPerPage) }).map((_, index) => (
                    <Button key={index} onClick={() => paginate(index + 1)}>{index + 1}</Button>
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;
