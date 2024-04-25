
const Organisation = require('../models/business');
const Account = require('../models/account');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bcrypt = require('bcrypt');
const validator = require('validator');
const UserPreferences = require('../models/userPreferences');



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

const getAccountInfo = async (req, res) => {

  const { stripeAccountId } = req.user;
  if (!stripeAccountId) {
    return res.status(400).json({ error: 'Stripe account ID is required.' });
  }

  try {
    const account = await Account.findOne({ stripeAccountId });

    if (!account) {

      return res.status(404).json({ error: `Account with Stripe ID ${stripeAccountId} not found.` });
    }

   //taking pw out so not returned to client
    const { password, ...accountInfo } = account.toObject();
    res.status(200).json(accountInfo);
  } catch (error) {

    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation Error', details: error.message });
    } else if (error.name === 'MongoServerError') {
      res.status(503).json({ error: 'Database Error', details: error.message });
    } else {
     
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
};

const updatePreferences = async (req, res) => {
  console.log('Request received:', req.body);
  const { colourScheme, customMessage, businessName, organisationType, paymentTypes, logoURL, businessEmailAddress, businessContactNumber} = req.body;
  
  try {
     const { stripeAccountId } = req.user;
    
    const updatedPreferences = await UserPreferences.findOneAndUpdate(
      { stripeAccountId },
      {
        colour: colourScheme,
        typeOfOrganisation: organisationType,
        typeOfPaymentsToReceive: paymentTypes,
        customMessageForPaymentLink: customMessage,
        displayedBusinessName: businessName,
        logo: logoURL,
        businessEmailAddress: businessEmailAddress,
        businessContactNumber: businessContactNumber,
      },
      {
        new: true, // Return the updated document
        upsert: true // Create a new document if one doesn't exist
      }
    );


    res.status(200).json(updatedPreferences);
  } catch (error) {
    console.error('Failed to update user preferences:', error);
    res.status(500).json({ message: 'Failed to update preferences' });
  }
};

const getPreferences = async (req, res) => {
  const { stripeAccountId } = req.user;

  try {
    const preferences = await UserPreferences.findOne({ stripeAccountId });

    if (!preferences) {
  
      return res.status(200).json({
        message: 'No preferences found for this account.',
        preferencesFound: false
      });
    }

    res.status(200).json({ 
      preferences: preferences,
      preferencesFound: true 
    });
  } catch (error) {
    console.error('Failed to get user preferences:', error);
    res.status(500).json({ message: 'Failed to get preferences due to server error' });
  }
};

const changePassword = async (req, res) => {


  const { stripeAccountId } = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!stripeAccountId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Required information is missing.' });
  }

  if (!validator.isStrongPassword(newPassword)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one lowercase, one uppercase, one number, and one special character' });
  }

  try {
    const account = await Account.findOne({ stripeAccountId });
    if (!account) {
      return res.status(404).json({ error: 'Account not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, account.password);
    if (!isMatch) {
      
      return res.status(401).json({ error: 'Invalid current password.' });
    }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    account.password = hashedPassword;
    await account.save();

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error(error); 
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ error: 'An error occurred.', details: error.message });
  }
};





module.exports = {
  addOrganisation,
  getAccountInfo,
  changePassword,
  updatePreferences,
  getPreferences
  };
