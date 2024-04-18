const Homework = require('../models/homeworkModel');

const homeworkController = {
    createHomework: async (req, res) => {
        try {
            const { courseName, courseId, teacherId, studentId } = req.body;
            const newHomework = new Homework({ courseName, courseId, teacherId, studentId, pdfFile:req.file.path });
            await newHomework.save();
            res.status(201).json({ message: 'Homework created successfully', homework: newHomework });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllHomework: async (req, res) => {
        try {
            const allHomework = await Homework.find();
            res.status(200).json({ homework: allHomework });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = homeworkController;
