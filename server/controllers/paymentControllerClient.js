const { parse } = require('path');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Account = require('../models/account');

async function getTakePaymentInfo(req, res) {
    const { stripeAccountId, paymentIntentId } = req.body;

    try { 
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
            stripeAccount: stripeAccountId
        });

        let customerName = "Not provided";
        if (paymentIntent.customer) {
            const customer = await stripe.customers.retrieve(paymentIntent.customer, {
                stripeAccount: stripeAccountId
            });
            customerName = customer.name || "Not provided";
        }

        const account = await Account.findOne({ stripeAccountId: stripeAccountId });
        const businessName = account ? account.businessName : "Not provided";

        const amount = paymentIntent.amount / 100; 
        
 
        const status = paymentIntent.status;

        res.send({
            clientSecret: paymentIntent.client_secret,
            amount,
            customerName,
            businessName,
            status 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching payment intent information.');
    }
}

async function confirmationPaymentDetails(req, res) {
    const { paymentIntentId } = req.params;
    const { account: stripeAccountId } = req.query;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
            stripeAccount: stripeAccountId,
        });

    
        console.log("PAYMENT STATUS: ", paymentIntent.status);
        console.log("RECEIPT EMAIL: ", paymentIntent.receipt_email);
        console.log("PAYMENT INTENT AFTER PAID: ", paymentIntent);

        const amount = paymentIntent.amount / 100; // Convert amount to pounds

        res.json({
            status: paymentIntent.status,
            receiptEmail: paymentIntent.receipt_email || 'Email not provided', 
            amount: amount, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching payment details.');
    }
}


  module.exports = {    
    getTakePaymentInfo,
    confirmationPaymentDetails
  };