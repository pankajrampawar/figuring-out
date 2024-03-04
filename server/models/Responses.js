const mongoose = require('mongoose')

const ResponseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true
    },
    replyOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drop",
        required: true
    }
})

const Response = mongoose.model('Response', ResponseSchema)

module.exports = Response;