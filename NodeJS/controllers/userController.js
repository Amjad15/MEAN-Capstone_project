
const express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');
const SALT_WORK_FACTOR = 10;

//get all users
router.get('/users', (req,res) => {
    User.find((err , docs) => {
        if (!err) { 
            res.send(docs); 
        }
        else {
            res.send("Error in Retriving users !");
        }
    });
});

// get user information !
router.get('/getUserInfo', async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.send(user);  
        } else {
            res.send("No record with given information !");
        }
    }catch (error){
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }   

});

// login user
router.post('/login', async (req,res) => {
    
    try {
        const user = await User.findOne({ email: req.body.email });
       
        if (user) {
            var pass=req.body.pass;
            const salt =await bcrypt.genSalt(SALT_WORK_FACTOR);
            const cmp = await bcrypt.compare(pass, user.pass);
            if (cmp) {
                //   ..... further code to maintain authentication like jwt or sessions
                res.send({ msg : "Auth Successful" , user : user});
            }
            else {
                res.send("Wrong username or password.." );
            }
        } else {
            res.send("Wrong username or password.!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }
});

router.post('/register', async (req,res) => {
    var pass=req.body.pass;
    const salt =  await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash_pass = await bcrypt.hash(pass, salt);

    var obj = new User({
        username : req.body.username,
        email : req.body.email,
        pass : hash_pass,
        role : "user",
        active : "1",
        createdAt : new Date(),
    });

    obj.save((err , doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else {
            console.log('Error in registering user :' + JSON.stringify(err, undefined ,2)); 
        }
    });
   
});
router.post('/addUser', async (req,res) => {
    var pass=req.body.pass;
    const salt =  await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash_pass =  await bcrypt.hash(pass, salt);

    var obj = new User({
        username : req.body.username,
        email : req.body.email,
        pass : hash_pass,
        role : "admin",
        active : "1",
        createdAt : new Date(),
    });

    obj.save((err , doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else {
            console.log('Error in registering user :' + JSON.stringify(err, undefined ,2)); 
        }
    });
   
});

router.put('/editUser/:id', async (req,res) => {

    if ( !objectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id} `);
    if(req.body.pass){
        var pass=req.body.pass;
        const salt =  await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash_pass = await bcrypt.hash(pass, salt);
        req.body.pass = hash_pass;
    }
    User.findByIdAndUpdate(req.params.id , { $set: req.body} , { new: true },(err,doc) => {
        if(!err) { 
            res.send({msg: "Updated Successfully!"});
        }
        else{
            res.send({msg: 'Error in updating user : ' , error: err});
        }
    });
   
});
//to de activate the user
router.put('/:id', (req,res) => {

    if ( !objectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id} `);
    
   
        User.findByIdAndUpdate(req.params.id , { $set: req.body} , { new: true },(err,doc) => {
            if(!err) { 
                res.send({msg: "Deactivated Successfully!"});
            }
            else{
                res.send({msg: 'Error in updating user : ' , error: err});
            }
        });
   
});


module.exports = router;
