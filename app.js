const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// IMPORTING ROUTER FILES 
const userRouter = require('./routes/userRouter');
const paymentRouter = require('./routes/paymentRouter');

// USING ROUTER FILES
app.use('/', userRouter); 
app.use('/', paymentRouter);

module.exports = app;