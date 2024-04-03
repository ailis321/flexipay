const express = require('express');
const requireAuthHeader = require("../middleware/requireAuthHeader");
const dashboardController = require('../controllers/dashboardController');
const router = require('express').Router();

// need to fire the middleware to check the user is authenticated before they can access any routes on the dashboard
router.use(requireAuthHeader);

router.get('/transactions', dashboardController.getTransactions);


module.exports = router;