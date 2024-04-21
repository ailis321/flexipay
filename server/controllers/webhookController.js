const Account = require('../models/account');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];
   

    try {
    
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log('Event received from hook:', event.type);
    


        res.json({ received: true });
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
};


async function findUserByStripeAccountId(stripeAccountId) {
    // Placeholder for your actual implementation
    return await Account.findOne({ stripeAccountId: stripeAccountId });
}

module.exports = {
    stripeWebhookHandler,
};
