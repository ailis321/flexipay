const express = require('express');
const router = express.Router();
const requireAuthHeader = require("../middleware/requireAuthHeader");
const paymentControllerOrg = require('../controllers/paymentControllerOrg');


// need to fire the middleware to check the user is authenticated before they can access any routes to do with the client
router.use(requireAuthHeader);


router.post('/create-payment-link', paymentControllerOrg.createPaymentLink);

router.post('/create-payment-method', paymentControllerOrg.createPaymentMethod);

router.post('/cancel-payment', paymentControllerOrg.cancelPayment);

router.post('/generate-new-intent', paymentControllerOrg.generateNewPaymentIntent);


module.exports = router;