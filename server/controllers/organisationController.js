
const Organisation = require('../models/organisation');


const renderRegisterOrganisationForm = (req, res) => {
    res.render('registerOrganisation'); 
};

const addOrganisation = async (req, res) => {
  try {

    const { name, email, password, stripePublicKey, stripeSecretKey } = req.body;


    const newOrganisation = new Organisation({
      name,
      email,
      password,
      stripePublicKey,
      stripeSecretKey,
    });


    const savedOrganisation = await newOrganisation.save();

    res.status(201).json(savedOrganisation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  addOrganisation,
  renderRegisterOrganisationForm
  
};
