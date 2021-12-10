const mongoose = require('mongoose');

var User = mongoose.model('User' , {
    username : { type: String , unique: true },
    email : { type: String , unique: true},
    pass : { type: String },
    active : { type: String }, 
    role : { type: String }, 
    createdAt : { type: String }
});

module.exports = { User } ; 