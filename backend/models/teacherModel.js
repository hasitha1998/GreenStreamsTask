const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const teacherSchema = new mongoose.Schema({

    teacherName:{
        type:String,
        required:true
    },
    teacherEmail:{
        type:String,
        required:true
    },
    teacherPassword:{
        type:String,
        required:true
    },
    profilePic:{
        type: String,   
    },
    
},
{
    timestamps:true
});

teacherSchema.pre('save', async function(next) {
    if (!this.isModified('teacherPassword')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.teacherPassword = await bcrypt.hash(this.teacherPassword, salt);
    next();
  });

teacherSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.teacherPassword);
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;