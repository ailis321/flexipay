const express = require('express');
const router = express.Router();
const requireAuthHeader = require("../middleware/requireAuthHeader");
const organisationController = require('../controllers/organisationController');

// need to fire the middleware to check the user is authenticated before they can access any routes to do with the client
router.use(requireAuthHeader);

router.get('/profile', organisationController.getAccountInfo);

router.patch('/change-password', organisationController.changePassword);

router.post('/set-preferences', organisationController.updatePreferences);

router.get('/get-preferences', organisationController.getPreferences);

module.exports = router;