//Import
require('dotenv').config();
require('./Configs/database').connect();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const auth = require('./Middlewares/auth');
var multer = require('multer');
var upload = multer();

//Routes Import
const testRoutes = require('./Routes/test');
const loginRoutes = require('./Routes/login');
const registerRoutes = require('./Routes/register');
const imageUploadRoutes = require('./Routes/imageUploadTest');
const ProductRoutes = require('./Routes/product');

//Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));
app.use(cors());
app.use(morgan('tiny'));

//Routes
app.use('/test', auth, testRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/uploadTest', imageUploadRoutes);
app.use('/productTest', ProductRoutes);
module.exports = app;

//Ref
// https://www.bezkoder.com/node-js-express-login-example/
// https://www.youtube.com/watch?v=XL5SBUZU35s