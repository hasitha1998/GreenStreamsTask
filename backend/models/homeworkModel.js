const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseId: {
        type: String
    },
    teacherId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    pdfFile: {
        type: String // Assuming you store the file path
    }
});

const Homework = mongoose.model('Homework', homeworkSchema);

module.exports = Homework;
