const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
    examId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    value: {
        type: Number,
        require:true,
    }
});

module.exports = mongoose.model('Result', resultSchema);
