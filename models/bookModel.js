const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);
