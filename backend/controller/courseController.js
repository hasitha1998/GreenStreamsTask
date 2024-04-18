const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');

// Create a new course
// POST /api/courses
// Private (for teachers)
const createCourse = asyncHandler(async (req, res) => {
  const { name, amount, teacherId } = req.body;

  const course = await Course.create({ name, amount, teacherId });

  if (course) {
    res.status(201).json(course);
  } else {
    res.status(400);
    throw new Error('Invalid course data');
  }
});

// Get all courses
// GET /api/courses
// Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Get a single course by ID
// GET /api/courses/:id
// Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// Update a course
// PUT /api/courses/:id
// Private (for teachers)
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    const { name, amount, teacherId } = req.body;

    course.name = name || course.name;
    course.amount = amount || course.amount;
    course.teacherId = teacherId || course.teacherId;

    const updatedCourse = await course.save();

    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// Delete a course
// DELETE /api/courses/:id
// Private (for teachers)
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
