const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// MIDDLEWARES | SETTING UP EJS AND BODY PARSER
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// IMPORTING ROUTER FILES
const userRouter = require('./routes/userRouter');
const paymentRouter = require('./routes/paymentRouter');
const organisationRouter = require('./routes/organisationRouter');
const featureRouter = require('./routes/featureRouter');
const accountRouter = require('./routes/accountRouter');
const clientRouter = require('./routes/clientRouter');

// USING ROUTER FILES
app.use('/', userRouter);
app.use('/api/payment', paymentRouter);
app.use('/api', organisationRouter);
app.use('/api/features', featureRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/clients', clientRouter);



module.exports = app;
