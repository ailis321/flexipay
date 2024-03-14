const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Account = require('../models/account');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d'})};

        exports.registerUser = async (req, res) => {
                try {
                    const { email, firstName, lastName, businessName, password } = req.body;
            
                    //attemoting to register the user with DB before creating stripe account
                    try {
                        const user = await Account.register(email, password, firstName, lastName, businessName);
            
                        //create stripe account for the user only if the user is created successfully
                        const account = await stripe.accounts.create({
                            type: 'standard',
                            country: 'GB',
                            email: email,
                        });
            
                        /// Update user with stripe account id now that it's created
                        user.stripeAccountId = account.id;
                        await user.save();
                        console.log('User created with Stripe ID:', user.stripeAccountId);
            
                        //Generate JWT token
                        const token = createToken(user._id);
            
                        // Create account link for stripe
                        const accountLink = await stripe.accountLinks.create({
                            account: user.stripeAccountId,
                            // the refresh URL calls backend to check if onboarding is complete
                        
                            refresh_url: `http://localhost:8000/api/accounts/check-onboarding/${user.stripeAccountId}`,
                            // return URL to bring the user to their logged in dashboard once onboarding is complete
                            return_url: 'http://localhost:3000/LoginHomeComplete',
                            type: 'account_onboarding',
                        });
            
                        // Sending the account link URL to frontend along with user and token
                        res.json({ accountLink: accountLink.url, user, token });
                        
                    } catch (error) {
                        console.error('Error creating user:', error);
                        // get the error message from the error object to display on frontend
                        res.status(400).json({ error: error.message });
                    }
                } catch (error) {
                    console.error('Error creating Stripe account:', error);
                    res.status(500).json({ error: 'Failed to create Account' });
                }
            };
            
    
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

  
        const user = await Account.login(email, password);
        const token = createToken(user._id);

        
        res.json({ user, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(400).json({ error: error.message });
    }
}

exports.checkOnboardingStatus = async (req, res) => {
    try {
        const { accountId } = req.params;

        ////Retrieve account details from Stripe
        const account = await stripe.accounts.retrieve(accountId);

        // Check if onboarding is complete
        if (account.details_submitted) {
            // Redirect to yourAccount page if onboarding is complete
            res.redirect('http://localhost:3000/LoginHomeComplete');
     
        } else {
            // Create account link to send back to onboarding
            const accountLink = await stripe.accountLinks.create({
                account: accountId,
                refresh_url: `http://localhost:8000/api/accounts/check-onboarding/${accountId}`, 
                return_url: 'http://localhost:3000/LoginHomeComplete', 
                type: 'account_onboarding',
            });

            // Redirecting back to Stripe for onboarding
            try {
                const user = await Account.findOne({ stripeAccountId: accountId });
                const userName = user.firstName;
                res.redirect(`http://localhost:3000/moreInfo?onboardingUrl=${accountLink.url}&account=${userName}`);
            } catch {
                // If user is not found, redirect without user name
                res.redirect(`http://localhost:3000/moreInfo?onboardingUrl=${accountLink.url}`);
            }
        }
    } catch (error) {
        console.error('Error checking onboarding status:', error);
        res.status(500).json({ error: 'Failed to check onboarding status' });
    }
};
