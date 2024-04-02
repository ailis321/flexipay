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
const paymentRouterOrg = require('./routes/paymentRouterOrg');
const organisationRouter = require('./routes/organisationRouter');
const featureRouter = require('./routes/featureRouter');
const accountRouter = require('./routes/accountRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const clientRouter = require('./routes/clientRouter');
const paymentRouterClient = require('./routes/paymentRouterClient');


// USING ROUTER FILES
app.use('/', userRouter);
app.use('/api/payment', paymentRouterOrg);
app.use('/api', organisationRouter);
app.use('/api/features', featureRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/clients', clientRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/payment-client', paymentRouterClient);



module.exports = app;
