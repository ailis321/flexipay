const express = require('express');
const router = express.Router();
const paymentControllerClient = require('../controllers/paymentControllerClient');


router.post('/get-client', paymentControllerClient.getTakePaymentInfo);

router.get('/confirmation-payment/:paymentIntentId', paymentControllerClient.confirmationPaymentDetails);

module.exports = router;

