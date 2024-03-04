
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user', userController.getUserPage);

router.get('/user/create-customer', userController.getCreateCustomersPage);

router.post('/user/create-customer-submit', userController.createCustomer);

router.get('/get-customers', userController.getCustomers); 

module.exports = router;
