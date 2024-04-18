const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    studentPassword: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },  
    Course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, {
    timestamps: true
});

studentSchema.pre('save', async function(next) {
    if (!this.isModified('studentPassword')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.studentPassword = await bcrypt.hash(this.studentPassword, salt);
    next();
});


studentSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.studentPassword);
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
