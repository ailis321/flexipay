const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepageController');

// Route to render the homepage
router.get('/', homepageController.renderHomepage);

// Route to render the how it works page
router.get('/how-it-works', homepageController.renderHowItWorks);

module.exports = router;
