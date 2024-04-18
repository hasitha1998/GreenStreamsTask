const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const Student = require('../models/studentModel');

// Student login
// POST /api/students/login
// Public
const authStudent = asyncHandler(async (req, res) => {
  const { studentEmail, studentPassword } = req.body;

  const student = await Student.findOne({ studentEmail });

  if (student && (await student.matchPassword(studentPassword))) {
    const token = generateToken(student._id);
    res.status(200).json({
      _id: student._id,
      name: student.studentName,
      email: student.studentEmail,
      profilePic: student.profilePic,
      courses: student.courses, // Include enrolled courses in the response
      token: generateToken(student._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Student registration
// POST /api/students/register
// Public
const registerStudent = asyncHandler(async (req, res) => {
  const { studentName, studentEmail, studentPassword, courses } = req.body;

  const student = await Student.create({
    studentName,
    studentEmail,
    studentPassword,
    profilePic: req.file.path,
    courses: courses || [], // Assign courses if provided, or default to an empty array
  });

  if (student) {
    const token = generateToken(student._id);
    res.status(201).json({
      _id: student._id,
      name: student.studentName,
      email: student.studentEmail,
      profilePic: student.profilePic,
      courses: student.courses, // Return the enrolled courses in the response
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid student data');
  }
});

// Update student profile
// PUT /api/students/profile
// Private
const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id);

  if (student) {
    const { studentName, studentEmail, studentPassword, courses } = req.body;

    student.studentName = studentName || student.studentName;
    student.studentEmail = studentEmail || student.studentEmail;
    if (studentPassword) {
      student.studentPassword = studentPassword;
    }
    if (courses) {
      student.courses = courses; // Update the enrolled courses if provided
    }

    const updatedStudent = await student.save();

    const token = generateToken(updatedStudent._id);

    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.studentName,
      email: updatedStudent.studentEmail,
      profilePic: updatedStudent.profilePic,
      courses: updatedStudent.courses, // Return the updated enrolled courses in the response
      token: token,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// Delete student profile
// DELETE /api/students/profile
// Private
const deleteStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id);

  if (student) {
    await student.remove();
    res.json({ message: 'Student removed' });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// Student logout
// POST /api/students/logout
// Private
const logoutStudent = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Student logged out' });
});

const enrollStudentToCourse = asyncHandler(async (studentId, courseId) => {
  try {
    // Find the student by ID
    const student = await Student.findById(studentId);

    // If student not found, return an error
    if (!student) {
      throw new Error('Student not found');
    }

    // Add the courseId to the courses array if not already enrolled
    if (!student.Course.includes(courseId)) {
      student.Course.push(courseId);
      await student.save();
    }

    // Return the updated student
    return student;
  } catch (error) {
    // Handle any errors
    console.error('Error enrolling student to course:', error);
    throw error;
  }
});


const getOneStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  const student = await Student.findById(studentId);

  if (student) {
    res.status(200).json({
      _id: student._id,
      name: student.studentName,
      email: student.studentEmail,
      profilePic: student.profilePic,
      courses: student.Course,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});




module.exports = { authStudent, registerStudent, updateStudentProfile, deleteStudentProfile, logoutStudent, enrollStudentToCourse,getOneStudent };
