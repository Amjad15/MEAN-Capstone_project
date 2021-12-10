const mongoose = require('mongoose');

var product = mongoose.model('Product' , {
    name : { type: String },
    quantity : { type: Number },
    price : { type: String }, 
    img : { type: String }
});

module.exports = { product } ; 