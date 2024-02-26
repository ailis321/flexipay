const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountsController');

// POST endpoint to create a Stripe Connect account
router.post('/create-account', accountController.createStripeAccount);

module.exports = router;
