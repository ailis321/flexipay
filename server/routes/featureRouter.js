
const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

// Route to fetch all features
router.get('/', featureController.getAllFeatures);

router.post('/', featureController.createFeatures);

module.exports = router;