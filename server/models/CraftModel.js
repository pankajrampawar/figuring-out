const mongoose = require('mongoose');

const CraftSchema = new mongoose.Schema({
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
});


const Craft = mongoose.model('Craft', CraftSchema);

module.exports = Craft;