const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createStripeAccount = async (req, res) => {
  try {
    const { email, firstName, lastName, businessName } = req.body;

    // Create Stripe Connect account
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'GB',
      email: email,     
    });

    // Create account link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:3000/register',
      return_url: 'http://localhost:3000',
      type: 'account_onboarding',
    });

    // Send the account link URL to the frontend
    res.json({ accountLink: accountLink.url });
  } catch (error) {
    console.error('Error creating Stripe account:', error);
    res.status(500).json({ error: 'Failed to create Stripe account' });
  }
};
