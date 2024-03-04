const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true,
        enum: ["VESIT", "SPIT"],
    },
    year: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4]
    },
    branch: {
        type: String,
        required: true,
        enum: ["CMPN", "EXTC", "ECS", "IT", "AIDS"]
    }
});

const User = mongoose.model('User', UserSchema)

module.exports = User;