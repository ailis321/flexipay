const express = require('express');
const router = express.Router();
const requireAuthHeader = require("../middleware/requireAuthHeader");
const paymentController = require('../controllers/paymentController');


// need to fire the middleware to check the user is authenticated before they can access any routes to do with the client
router.use(requireAuthHeader);


router.get('/paymentLink', paymentController.getPaymentLink);


router.post('/create-payment-link', paymentController.createPaymentLink);

//router.post('/collect-payment', paymentController.collectPayment);

//router.get(`/pay/:paymentIntentId`, paymentController.getTakePaymentPage);
router.post('/get-client', paymentController.getTakePaymentInfo);

router.post('/create-payment-method', paymentController.createPaymentMethod);


router.post('/complete-payment', paymentController.completePayment);

module.exports = router;