const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');

// Auth user
// route POST/api/users/auth
// access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// Register user
// route POST/api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;

  // Check if a file is included in the request
  if (!req.file) {
    res.status(400);
    throw new Error('Profile picture is required');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    mobile,
    email,
    password,
    profilepic: req.file.path,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
      profilepic: user.profilepic,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Logout user
// route POST/api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// Get user profile
// route Get/api/users/profile
// access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User profile' });
});

module.exports = { authUser, registerUser, logoutUser, getUserProfile };
