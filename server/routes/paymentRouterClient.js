const express = require('express');
const router = express.Router();
const paymentControllerClient = require('../controllers/paymentControllerClient');


router.post('/get-client', paymentControllerClient.getTakePaymentInfo);

module.exports = router;