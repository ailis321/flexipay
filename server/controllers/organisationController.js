
const Organisation = require('../models/business');
const Account = require('../models/account');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bcrypt = require('bcrypt');




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

const changePassword = async (req, res) => {
  console.log('changePassword request received ');
  
  const { stripeAccountId } = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!stripeAccountId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Required information is missing.' });
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

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    account.password = hashedPassword;
    await account.save();

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error(error); // Always log the actual error for server logs
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ error: 'An error occurred.', details: error.message });
  }
};




module.exports = {
  addOrganisation,
  getAccountInfo,
  changePassword,
  };
