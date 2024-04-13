const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const Teacher = require('../models/teacherModel');

// Teacher login
// POST /api/teachers/login
// Public
const authTeacher = asyncHandler(async (req, res) => {
  const { teacherEmail, teacherPassword } = req.body;

  const teacher = await Teacher.findOne({ teacherEmail });

  if (teacher && (await teacher.matchPassword(teacherPassword))) {
    const token = generateToken(teacher._id);
    res.status(200).json({
      _id: teacher._id,
      name: teacher.teacherName,
      email: teacher.teacherEmail,
      profilePic: teacher.profilePic,
      token: generateToken(res, teacher._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Teacher registration
// POST /api/teachers/register
// Public
const registerTeacher = asyncHandler(async (req, res) => {
  const { teacherName, teacherEmail, teacherPassword } = req.body;

  // const teacherExists = await Teacher.findOne({ teacherEmail });

  // if (teacherExists) {
  //   res.status(400);
  //   throw new Error('Teacher already exists');
  // }

  const teacher = await Teacher.create({
    teacherName,
    teacherEmail,
    teacherPassword,
    profilePic:req.file.path,
  });

  if (teacher) {
    const token = generateToken(teacher._id);
    res.status(201).json({
      _id: teacher._id,
      name: teacher.teacherName,
      email: teacher.teacherEmail,
      profilePic: teacher.profilePic,
      password: teacher.password,
      token: generateToken(teacher._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid teacher data');
  }
});

// Update teacher profile
// PUT /api/teachers/profile
// Private
const updateTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.user._id);

  if (teacher) {
    const { teacherName, teacherEmail, teacherPassword } = req.body;

    teacher.teacherName = teacherName || teacher.teacherName;
    teacher.teacherEmail = teacherEmail || teacher.teacherEmail;
    if (teacherPassword) {
      teacher.teacherPassword = teacherPassword;
    }

    const updatedTeacher = await teacher.save();

    const token = generateToken(updatedTeacher._id);

    res.json({
      _id: updatedTeacher._id,
      name: updatedTeacher.teacherName,
      email: updatedTeacher.teacherEmail,
      profilePic: updatedTeacher.profilePic,
      token: token,
    });
  } else {
    res.status(404);
    throw new Error('Teacher not found');
  }
});

// Delete teacher profile
// DELETE /api/teachers/profile
// Private
const deleteTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.user._id);

  if (teacher) {
    await teacher.remove();
    res.json({ message: 'Teacher removed' });
  } else {
    res.status(404);
    throw new Error('Teacher not found');
  }
});

// Teacher logout
// POST /api/teachers/logout
// Private
const logoutTeacher = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Teacher logged out' });
});

module.exports = { authTeacher, registerTeacher, updateTeacherProfile, deleteTeacherProfile, logoutTeacher };
