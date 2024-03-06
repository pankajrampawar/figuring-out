const mongoose=require('mongoose');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    drops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drop'
    }]
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;