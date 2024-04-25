const { parse } = require('path');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Account = require('../models/account');
const UserPreferences = require('../models/userPreferences');
const nodemailer = require('nodemailer');

async function getTakePaymentInfo(req, res) {
    const { stripeAccountId, paymentIntentId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
            stripeAccount: stripeAccountId
        });

        let customerName = "Not provided";
        try {
            if (paymentIntent.customer) {
                const customer = await stripe.customers.retrieve(paymentIntent.customer, {
                    stripeAccount: stripeAccountId
                });
                customerName = customer.name || "Not provided";
            }
        } catch (error) {
            console.error('Failed to retrieve customer:', error);
        }

        let account = null, businessName = "Not provided";
        try {
            account = await Account.findOne({ stripeAccountId });
            businessName = account ? account.businessName : "Not provided";
        } catch (error) {
            console.error('Failed to retrieve account details:', error);
        }

        const amount = paymentIntent.amount / 100;
        const status = paymentIntent.status;

        let preferences = null;
        try {
            preferences = await UserPreferences.findOne({ stripeAccountId });
            if (!preferences) {
                console.log('No preferences found for this user');
            } 
        } catch (error) {
            console.error('Failed to get user preferences:', error);
        }

        res.send({
            clientSecret: paymentIntent.client_secret,
            amount,
            customerName,
            businessName,
            status,
            preferences
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

        const amount = paymentIntent.amount / 100; 

        // Get the email of the recipient of this stripe account receiving the payment
        ownerAccount = await Account.findOne({ stripeAccountId });
        const email = ownerAccount.email;


        if (paymentIntent.status === 'succeeded') {
          
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.SENDER_EMAIL,
                  pass: process.env.EMAIL_PW,
                }
              });
              

            let info = await transporter.sendMail({
                from: 'FlexiPay <support@flexipay.com>', 
                to: email, 
                subject: "Payment Received", 
                text: `Hello,\n\nYou have received a payment of £${paymentIntent.amount / 100} from ${paymentIntent.receipt_email}. Thank you for using FlexiPay`, // plain text body
      
            });

            console.log("Message sent: %s", info.messageId);
        }

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