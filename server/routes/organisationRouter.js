const express = require('express');
const router = express.Router();

const organisationController = require('../controllers/organisationController');

// Route to render the register organisation form
router.get('/register-organisation', organisationController.renderRegisterOrganisationForm);

// Route to add a new organisation
router.post('/organisations', organisationController.addOrganisation);



module.exports = router;