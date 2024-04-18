const express = require('express');
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../controller/courseController');

const router = express.Router();

// Create a new course
// POST /api/courses
router.post('/create', createCourse);

// Get all courses
// GET /api/courses
router.get('/viewAll', getCourses);

// Get a single course by ID
// GET /api/courses/:id
router.get('/:id', getCourseById);

// Update a course
// PUT /api/courses/:id
router.put('/:id', updateCourse);

// Delete a course
// DELETE /api/courses/:id
router.delete('/:id', deleteCourse);

module.exports = router;
