import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, CircularProgress, Container, Typography } from '@mui/material';

const PaymentPage = () => {
    const { courseId, amount } = useLocation().state;
    const navigate = useNavigate(); // Initialize useNavigate

    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [studentId, setStudentId] = useState(localStorage.getItem('studentId'));

    useEffect(() => {
        console.log('Course ID:', courseId);
        console.log('Amount:', amount);
        console.log('Student ID:', studentId);
    }, [courseId, amount, studentId]);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/payment/process', {
                amount
            });
            const { clientSecret } = response.data;
            setClientSecret(clientSecret);
            // Assuming the response from payment API contains studentId after successful payment
            setStudentId(response.data.studentId);
            // Enroll student into the course after successful payment
            await enrollStudentToCourse(studentId, courseId);
            navigate('/student-dashboard');
        } catch (error) {
            setPaymentError('Error processing payment');
        }
        setLoading(false);
    };

    // Function to enroll student into the course
    const enrollStudentToCourse = async (studentId, courseId) => {
        try {
            await axios.post('http://localhost:5000/api/students/enroll-course', {
                studentId,
                courseId
            });
            console.log('Student enrolled successfully!');
        } catch (error) {
            console.error('Error enrolling student to course:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Payment Page
            </Typography>
            <p>Course ID: {courseId}</p> {/* Ensure courseId is rendered */}
            <p>Amount: {amount}</p> {/* Ensure amount is rendered */}
            <p>Student ID: {studentId}</p> {/* Ensure studentId is rendered */}
            {loading && <CircularProgress />}
            {clientSecret ? (
                <form action="/checkout" method="POST">
                    <input type="hidden" name="clientSecret" value={clientSecret} />
                    <Button type="submit" variant="contained" color="primary">
                        Pay Now
                    </Button>
                </form>
            ) : (
                <Button onClick={handlePayment} variant="contained" color="primary">
                    Initiate Payment
                </Button>
            )}
            {paymentError && <Typography color="error">{paymentError}</Typography>}
        </Container>
    );
};

export default PaymentPage;
