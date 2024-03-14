const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountsController');

// POST endpoint to create a Stripe Connect account
router.post('/create-account', accountController.registerUser);

// Route for periodically checking account details status
router.get('/check-onboarding/:accountId', accountController.checkOnboardingStatus); 

router.post('/login', accountController.login);

module.exports = router;
