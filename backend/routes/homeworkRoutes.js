const express = require('express');
const router = express.Router();

const { upload } = require('../utils/homeworkUploadConfig');
const homeworkController = require('../controller/homeworkController');

// Create a new homework with file upload
router.post('/create', upload.single('pdfFile'), homeworkController.createHomework);
router.get('/all', homeworkController.getAllHomework);


// Implement other routes as needed

module.exports = router;
