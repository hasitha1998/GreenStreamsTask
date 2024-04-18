import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

function ViewAllHomework() {
    const [homeworkEntries, setHomeworkEntries] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(() => {
        const fetchHomeworkEntries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/homework/all');
                const allHomework = response.data.homework;
                const filteredHomework = allHomework.filter(homework => homework.teacherId === teacherId);
                setHomeworkEntries(filteredHomework);
            } catch (error) {
                console.error('Error fetching homework entries:', error);
            }
        };

        fetchHomeworkEntries();
    }, [teacherId]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Homework Entries</h2>
            <Grid container spacing={2}>
                {homeworkEntries.map(homework => (
                    <Grid item xs={12} sm={6} md={4} key={homework._id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Course Name: {homework.courseName}
                                </Typography>
                                <Typography variant="body1">
                                    Course ID: {homework.courseId}
                                </Typography>
                                <Typography variant="body1">
                                    Teacher ID: {homework.teacherId}
                                </Typography>
                                <Typography variant="body1">
                                    Student ID: {homework.studentId}
                                </Typography>
                                <div style={{ marginTop: '10px' }}>
                                    <Button variant="contained" color="secondary" href={homework.pdfFile} download>
                                        Download PDF
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ViewAllHomework;
