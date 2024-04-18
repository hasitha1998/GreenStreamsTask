import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

function ViewOneCourse() {
    const location = useLocation();
    const navigate = useNavigate(); // Get navigate function
    const { courseId, courseName, teacherId, studentId } = location.state;
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('courseName', courseName);
            formData.append('courseId', courseId);
            formData.append('teacherId', teacherId);
            formData.append('studentId', studentId);
            formData.append('pdfFile', selectedFile);

            await axios.post('http://localhost:5000/api/homework/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Homework uploaded successfully');
            navigate('/student-dashboard'); // Redirect to student dashboard after successful upload
        } catch (error) {
            console.error('Error uploading homework:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div>
                <h2>ViewOneCourse</h2>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Course Name: {courseName}
                        </Typography>
                        <Typography variant="body1">
                            Course ID: {courseId}
                        </Typography>
                        <Typography variant="body1">
                            Teacher ID: {teacherId}
                        </Typography>
                        <Typography variant="body1">
                            Student ID: {studentId}
                        </Typography>
                    </CardContent>
                </Card>
                <div style={{ marginTop: '20px' }}>
                    <input
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                            Upload PDF
                        </Button>
                    </label>
                </div>
                {selectedFile && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="body1">
                            Selected PDF: {selectedFile.name}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleUpload}>
                            Upload Homework
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewOneCourse;
