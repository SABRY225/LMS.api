const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        require:true,
        enum: ['Student', 'Teacher','Admin'],
        default: 'Student',
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userImg:{
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model('User', userSchema);
