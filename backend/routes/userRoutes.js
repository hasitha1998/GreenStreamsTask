const express = require('express');
const { upload } = require('../utils/cloudinaryConfig');
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
} = require('../controller/userController');

const router = express.Router();

// Use the upload middleware for the 'profilepic' field in the registerUser route
router.post('/register', upload.single('profilePic'), registerUser);

router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile);

module.exports = router;
