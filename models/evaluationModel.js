const mongoose = require('mongoose');
const evaluationSchema = new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    value: {
        type: Number,
        require:true,
        enum: [1,2,3,4,5],
        default: 1,
    }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
