const express = require('express');
const { upload } = require('../utils/cloudinaryConfig');
const {
  authTeacher,
  registerTeacher,
  updateTeacherProfile,
  deleteTeacherProfile,
  logoutTeacher,
  getTeacherById
} = require('../controller/teacherController');

const router = express.Router();

// Use the upload middleware for the 'profilePic' field in the registerTeacher route
router.post('/register', upload.single('profilePic'), registerTeacher);
router.post('/login',upload.single(null), authTeacher);
router.put('/profile', updateTeacherProfile);
router.delete('/profile', deleteTeacherProfile);
router.post('/logout', logoutTeacher);
router.get('/:id', getTeacherById);


module.exports = router;
