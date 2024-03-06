const mongoose = require('mongoose');

const DropSchema = new mongoose.Schema({
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
    likes: {
        type: Number,
        default: 0
    },
    hashtags: [{
        type: String
    }],
});


const Drop = mongoose.model('Drop', DropSchema);

module.exports = Drop;