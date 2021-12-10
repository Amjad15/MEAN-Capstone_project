const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;
const fileUpload = require('express-fileupload');

var { product } = require('../models/product');
var { cart } = require('../models/ShoppingCart');
var { wishList } = require('../models/wishList');
router.get('/getAll', (req,res) => {
    product.find((err , docs) => {
        if (!err) { 
            res.send(docs); 
        }
        else {
            console.log('Error in Retriving Products :' + JSON.stringify(err, undefined ,2)); 
        }
    });
});
router.post('/getCart', (req,res) => {
    cart.find({username : req.body.username} , (err , docs) => {
        if (!err) { 
            
            res.send(docs); 
            
        }
        else {
            console.log('Error in Retriving Cart Items :' + JSON.stringify(err, undefined ,2)); 
        }
    });
});
router.post('/getWishlist', (req,res) => {
    wishList.find({username : req.body.username} , (err , docs) => {
        if (!err) { 
            
            res.send(docs); 
            
        }
        else {
            console.log('Error in Retriving wishlist Items :' + JSON.stringify(err, undefined ,2)); 
        }
    });
});


// get user information !
router.get('/getInfo/:id', async (req,res) => {
    try {
        const product = await product.findOne(req.params.id );
        if (product) {
            res.send(product);  
        } else {
            res.send("No record with given information !");
        }
    }catch (error){
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }   

});
router.post('/add',  (req,res) => {
   
    var obj = new product({
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity,
        img : req.body.img ,
   
    });
    if (req.files) {
        let file = req.files.imgFile;
        let DIRPath = '../NodeJS/assets/images/' + file.name;
        file.mv(DIRPath, function(err) {
        if (err) {
            return res.send(false);
            } else {
                obj.save()
                .then(doc => { res.send(true); })
                .catch(err => { console.log('Error in Posting Product: ' + JSON.stringify(err, undefined, 2)); res.send(false);});
            }
        });
    } else {
        console.log(req.files);
        res.send(false);
    }

    
   
});

router.post('/AddingToCart', (req, res) => {
    let shoppingCart = new cart ({
        productId: req.body.productId,
        name: req.body.name,
        img: req.body.img,
        quantity: req.body.quantity,
        price: req.body.price,
        username: req.body.username
    });
    shoppingCart.save()
    .then(doc => { res.send(true); })
    .catch(err => { console.log('Error in Posting Product: ' + JSON.stringify(err, undefined, 2)) });
});
router.post('/addingToWishList', (req, res) => {
    let wish_list = new wishList ({
        productId: req.body.productId,
        name: req.body.name,
        img: req.body.img,
        quantity: req.body.quantity,
        price: req.body.price,
        username: req.body.username
    });
    wish_list.save()
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Posting Product: ' + JSON.stringify(err, undefined, 2)) });
});

router.put('/edit/:id', (req,res) => {

    if ( !objectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id} `);
    
        if (req.files) {
            let file = req.files.imgFile;
            let DIRPath = '../NodeJS/assets/images/' + file.name;
            file.mv(DIRPath, function(err) {
            if (err)
                return res.send(false);
            });
        }

    var obj = {
        name : req.body.name,
        quantity : req.body.quantity,
        price : req.body.price,
        img : req.body.img,
    };


    product.findByIdAndUpdate(req.params.id , { $set: obj} , { new: true },(err,doc) => {
        if(!err) { 
            res.send(doc);
        }
        else{
            console.log('Error in updating product : ' + JSON.stringify(err,undefined,2));
        }
    });
   
});

router.delete('/delete/:id', (req,res) => {

    if ( !objectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id} `);
    
   
    product.findByIdAndRemove(req.params.id ,(err,doc) => {
        if(!err) { 
            res.send(doc);
        }
        else{
            console.log('Error in Deleting product : ' + JSON.stringify(err,undefined,2));
        }
    });
   
});


module.exports = router;