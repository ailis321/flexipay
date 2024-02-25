const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/paymentLink', paymentController.getPaymentLink);


router.post('/create-payment-link', paymentController.createPaymentLink);

//router.post('/collect-payment', paymentController.collectPayment);

//router.get(`/pay/:paymentIntentId`, paymentController.getTakePaymentPage);
router.get(`/pay/:paymentIntentId/:customerId`, paymentController.getTakePaymentPage);

router.post('/create-payment-method', paymentController.createPaymentMethod);


router.post('/complete-payment', paymentController.completePayment);

module.exports = router;