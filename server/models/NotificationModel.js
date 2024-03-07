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


/*
"your message is liked"

Notification.unread.append("your message is liked");


id of 1, 2 ,3 ,4

unread, id === id

// pop from unread

// append to read
