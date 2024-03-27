const { parse } = require('path');
const bodyParser = require('body-parser');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function getPaymentLink(req, res) {
    res.render('paymentLink');
  }
  
  async function createPaymentLink(req, res) {
    try {
        // Creating payment intent with stripeAccount parameter
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(req.body.amount) * 100,
            currency: 'gbp',
            customer: req.body.customerId,
            description: req.body.description,
            receipt_email: req.body.email,
            payment_method: "pm_card_visa",
            automatic_payment_methods: {
                enabled: true,
            },
          },
          {
            stripeAccount: req.user.stripeAccountId, 
          }
        );

        console.log('Payment intent:', paymentIntent);

        
        const paymentLink = `http://localhost:3000/pay/${paymentIntent.id}?account=${req.user.stripeAccountId}`;

        res.json({ paymentLink });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating payment link.');
    }
}


async function createPaymentMethod(req, res) {
    try {
        const {
            fullName,
            addressLine1,
            addressLine2,
            city,
            country,
            postcode,
            cardNumber,
            expiryMonth,
            expiryYear,
            cardCvc,
            customerId
        } = req.body;

        // Create payment method
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: cardNumber,
                exp_month: expiryMonth,
                exp_year: expiryYear,
                cvc: cardCvc,
            },
            billing_details: {
                name: fullName,
                address: {
                    line1: addressLine1,
                    line2: addressLine2,
                    city: city,
                    country: country,
                    postal_code: postcode,
                },
            },
        });

        console.log(paymentMethod);

        // Attach payment method to customer
        await stripe.customers.update(customerId, {
            metadata: {
                paymentMethodId: paymentMethod.id,
            },
        });

        //error or success
        res.send('Payment method created successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating payment method.');
    }
}

//not using atm - will change***
  async function completePayment(req, res) {
    try {
        const { paymentIntentId, paymentMethodId, name, email } = req.body;

        
        const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
            customer: name,

                email,
          
        });

      
        if (confirmedPaymentIntent.status === 'succeeded') {
           
            res.json({ success: true, paymentIntent: confirmedPaymentIntent });
        } else {
            
            res.json({ success: false, paymentIntent: confirmedPaymentIntent });
        }
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).send('Error completing payment.');
    }
  
}

module.exports = {
  getPaymentLink,
  createPaymentLink,
  createPaymentMethod,
  completePayment  
};
