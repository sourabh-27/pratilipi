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
    }
});

module.exports = new mongoose.model('user', userSchema);