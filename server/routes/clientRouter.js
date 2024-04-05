
const express = require('express');
const requireAuthHeader = require("../middleware/requireAuthHeader");
const router = express.Router();
const clientController = require('../controllers/clientController');



// need to fire the middleware to check the user is authenticated before they can access any routes to do with the client
router.use(requireAuthHeader);

router.post('/create-customer-submit', clientController.createCustomer);

router.get('/get-customers', clientController.getCustomers); 

router.get('/get-all-customers', clientController.getAllCustomersFromDB);

router.put('/edit-customer/:customerId', clientController.editCustomer);

router.delete('/delete-customer/:customerId', clientController.deleteCustomer);

module.exports = router;
