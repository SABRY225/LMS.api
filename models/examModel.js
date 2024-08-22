const mongoose = require('mongoose');
const examSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    name: {
        type: String,
        required: true
    },
    questions: [
        {
            content: {
                type: String,
                required: true
            },
            selectAnswer1: {
                type: String,
                required: true
            },
            selectAnswer2: {
                type: String,
                required: true
            },
            selectAnswer3:{
                type: String,
                required: true
            },
            selectAnswer4: {
                type: String,
                required: true
            },
            answer: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Exam', examSchema);
