const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Account = require('../models/account');
const bycrypt = require('bcrypt');


exports.createStripeAccount = async (req, res) => {
    try {
      const { email, firstName, lastName, businessName, password } = req.body;
  
      //Creating Stripe Connect account
      const account = await stripe.accounts.create({
        type: 'standard',
        country: 'GB',
        email: email,
      });
  
      //Saving user to database with stripeAccountId using static method in Account model
      const registerUser = async () => {
        try {
          const user = await Account.register(email, password, firstName, lastName, businessName, account.id);
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      };
  
      //registerUser function
      const user = await registerUser();
  
      //Create account link
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `http://localhost:8000/api/accounts/check-onboarding/${account.id}`, // Update refresh_url
        return_url: 'http://localhost:3000/LoginHomeComplete',
        type: 'account_onboarding',
      });
  
      //Sending the account link URL to frontend
      res.json({ accountLink: accountLink.url, user: user });
    } catch (error) {
      console.error('Error creating Stripe account:', error);
      res.status(500).json({ error: 'Failed to create Stripe account' });
    }
  };
  

exports.checkOnboardingStatus = async (req, res) => {
  try {
    const { accountId } = req.params;

    // Retrieve account details from Stripe
    const account = await stripe.accounts.retrieve(accountId);

    // Check if onboarding is complete
    if (account.details_submitted) {
        // can update the user document in the database if needed but nothing needed now
    //   const user = await Account.findOne({ stripeAccountId: accountId });
    //   user.otherField = account.otherValue;
     
    //   await user.save();
      res.redirect('http://localhost:3000/yourAccount');
    } else {
        // Create account link to send back to onboarding
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `http://localhost:8000/api/accounts/check-onboarding/${accountId}`, 
        return_url: `http://localhost:8000/api/accounts/check-onboarding/${accountId}`, 
        type: 'account_onboarding',
      });
      // Redirect back to Stripe for onboarding
      try {
        
        const user = await Account.findOne({ stripeAccountId: accountId });
        const userName = user.firstName;
        res.redirect(`http://localhost:3000/moreInfo?onboardingUrl=${accountLink.url}&account=${userName}`);
      } catch{
        const noName = ''
        res.redirect(`http://localhost:3000/moreInfo?onboardingUrl=${accountLink.url}&account=${noName}`);
      }
    }
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    res.status(500).json({ error: 'Failed to check onboarding status' });
  }
};
