const { parse } = require('path');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function getTakePaymentInfo(req, res) {

    const { stripeAccountId } = req.body;
    const { paymentIntentId } = req.body;
    console.log('Payment intent ID:', paymentIntentId);
    console.log('Stripe account ID:', stripeAccountId);

    try { 
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      stripeAccount: stripeAccountId
     });
        console.log('Payment intent:', paymentIntent);
    
        const clientSecret = paymentIntent.client_secret;
        console.log('Client secret:', clientSecret);

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching payment intent.');
    }
  
  }

  module.exports = {    
    getTakePaymentInfo
  };