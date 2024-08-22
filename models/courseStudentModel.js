const mongoose = require('mongoose');

const courseStudentSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('CourseStudent', courseStudentSchema);
