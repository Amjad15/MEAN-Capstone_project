const mongoose = require('mongoose');

var cart = mongoose.model('ShoppingCart' , {
    productId : { type: String },
    quantity : { type: String },
    price : { type: String },
    name : { type: String }, 
    username : { type: String }, 
    img : { type: String }
});

module.exports = { cart } ; 
