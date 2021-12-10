const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const {mongoose} = require('./db.js');
var productController = require('./controllers/productController.js');
var userController = require('./controllers/userController.js');

var app = express();
app.use('/img', express.static(path.join(__dirname,'assets/images')));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200'}));
app.use(fileUpload({
    createParentPath: true
}));

app.listen(3000 , () => console.log('Server started at port 3000'));

app.use('/products', productController);
app.use('/api/user', userController);