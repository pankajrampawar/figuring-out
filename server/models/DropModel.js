const mongoose = require('mongoose');

const DropSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    responses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'response'
    }],
    report: {
        type: Boolean,
        enum: ['true', 'false']
    },
    branch: {
        type: String,
        required: true,
        enum: ["CMPN", "EXTC", "ECS", "IT", "AIDS"]
    },
    year: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4]
    },
    likes:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    }],
    hashtags: [{
        type: String
    }],
});


const Drop = mongoose.model('Drop', DropSchema);

module.exports = Drop;