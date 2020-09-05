const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    story1 : {
        type: Number, default: 0 
    }
});

module.exports = new mongoose.model('story', storySchema);