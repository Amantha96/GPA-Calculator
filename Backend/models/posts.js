const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    marks: {
        type: [Number], 
        required: true
    },
    gpa: {
        type: Number, 
        required: true
    },
    credits:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Posts', postSchema); 