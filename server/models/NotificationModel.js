const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false
    }
});

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification;
