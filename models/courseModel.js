const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    courseImg: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    nameMaterial: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true
    },
    code:{
        type: String,
        required: false
    },
    evaluation: {
        type: String,
        require:false,
    }
});

module.exports = mongoose.model('Course', courseSchema);
