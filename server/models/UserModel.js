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
    },
    profilePic:{
        type: String,    
    },
    slayScore:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        enum: ["single", "in relationship", "searching", "secret", "FWB", "grind mode", "dating"]
    },
    drops:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Drop"
    }],
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Response"
    }],
    bio:{
        type:String,
    },
    wordsOfConcern:[{
        type:String,
    }],
    Notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    friendsRequest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
});

const User = mongoose.model('User', UserSchema)

module.exports = User;