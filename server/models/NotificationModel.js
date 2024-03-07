const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    read: [{
        type: String,
    }],
    unread: [{
        content: String,
        number: String,
    }]
});

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification;

