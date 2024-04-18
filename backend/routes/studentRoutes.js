const express = require('express');
const { upload } = require('../utils/cloudinaryConfig');
const {
  authStudent,
  registerStudent,
  updateStudentProfile,
  deleteStudentProfile,
  logoutStudent,
  enrollStudentToCourse,
  getOneStudent
} = require('../controller/studentController');

const router = express.Router();

// Use the upload middleware for the 'profilePic' field in the registerStudent route
router.post('/register', upload.single('profilePic'), registerStudent);
router.post('/login',upload.single(null), authStudent);
router.put('/profile', updateStudentProfile);
router.delete('/profile', deleteStudentProfile);
router.post('/logout', logoutStudent);
router.get('/:id', getOneStudent);

router.post('/enroll-course', async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    // Enroll student to course
    const updatedStudent = await enrollStudentToCourse(studentId, courseId);

    // Send response with updated student data
    res.json({ success: true, student: updatedStudent });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
