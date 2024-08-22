const mongoose = require('mongoose');
const lectureSchema = new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    name: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Lecture', lectureSchema);
