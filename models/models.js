const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String, 
        required : true
    },
    username : {
        type : String, 
        required : true
    },
    password : {
        type : String, 
        required : true
    },
    messages: [{
        type: String
    }],
    story1 : {
        type : Boolean
    },
    story2 : {
        type: Boolean
    },
    story3 : {
        type: Boolean
    },
    story4 : {
        type: Boolean
    },
    story5 : {
        type: Boolean
    },
    story6 : {
        type: Boolean
    }
});

module.exports = new mongoose.model('user', userSchema);