

const mongoose = require('mongoose');

var wishList = mongoose.model('wishList' , {
    productId : { type: String },
    quantity : { type: String },
    price : { type: String },
    name : { type: String }, 
    username : { type: String }, 
    img : { type: String }
});

module.exports = { wishList } ; 
