// Import the Organisation model
const Organisation = require('../models/organisation');

// Render function for the register organisation form
const renderRegisterOrganisationForm = (req, res) => {
    res.render('registerOrganisation'); // Assuming 'registerOrganisation.ejs' is in your views directory
};

// Controller function to add an organisation
const addOrganisation = async (req, res) => {
  try {
    // Extract organisation details from the request body
    const { name, email, password, stripePublicKey, stripeSecretKey } = req.body;

    // Create a new organisation instance
    const newOrganisation = new Organisation({
      name,
      email,
      password,
      stripePublicKey,
      stripeSecretKey,
    });

    // Save the new organisation to the database
    const savedOrganisation = await newOrganisation.save();

    res.status(201).json(savedOrganisation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other controller functions go here if needed

module.exports = {
  addOrganisation,
  renderRegisterOrganisationForm
  // Export other controller functions as needed
};
