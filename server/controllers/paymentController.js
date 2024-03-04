const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function getPaymentLink(req, res) {
    res.render('paymentLink');
  }
  
  async function createPaymentLink(req, res) {
    try {
       //creating payment intent 
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(req.body.amount) * 100,
        currency: 'gbp',
        description: req.body.description,
        receipt_email: req.body.email,
        customer: req.body.customerId,
        automatic_payment_methods: {
            enabled: true,
          },

      });

         // Retrieve customer details using the customer ID
         const customer = await stripe.customers.retrieve(req.body.customerId);

         console.log(paymentIntent);
         console.log(customer);
 
         // Construct the payment link
         const paymentLink = `localhost:3000/pay/${paymentIntent.id}/${req.body.customerId}`;


         //here i could store the just enough customer info to my DB to be able to retrieve info from 
         //stripes customer/payment intent api later when making payment?
 
         //show payment link to copy
         
         res.render('presentPaymentLink', { paymentLink});

    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating payment link.');
    }
  }

  async function getTakePaymentPage(req, res) {
    const { paymentIntentId, customerId } = req.params;
  
    try {
    
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
      const clientSecret = paymentIntent.client_secret;

      console.log('Client sceret: ' + clientSecret);
  
      res.render('takePayment', { paymentIntentId, customerId, clientSecret });
    } catch (error) {
    
      res.status(500).send('Error fetching payment intent');
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
  getTakePaymentPage,
  createPaymentMethod,
  completePayment  
};
