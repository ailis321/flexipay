const express = require('express');
const webhookController = require('../controllers/webhookController');
const router = express.Router();
const bodyParser = require('body-parser');

router.post('/handle-hook', bodyParser.raw({ type: 'application/json' }), webhookController.stripeWebhookHandler);

module.exports = router;
