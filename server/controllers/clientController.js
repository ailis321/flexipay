const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/account');
const Customer = require('../models/customer');

async function createCustomer(req, res) {
  const { firstName, surname, email, phone } = req.body;
  const { _id, stripeAccountId } = req.user; // Destructure _id and stripeAccountId directly from req.user

  try {
    const stripeCustomer = await stripe.customers.create(
      {
        name: `${firstName} ${surname}`,
        email: email,
        phone: phone
      },
      {
        stripeAccount: stripeAccountId
      }
    );
        const customerId = stripeCustomer.id;
        console.log('Customer created:', customerId);

         // Create a new customer and save it to the database
    const newCustomer = await Customer.createCustomer(
        `${firstName} ${surname}`, 
        email, 
        phone, 
        _id, //the user id that created this customer
        stripeAccountId, //the stripe account this customer is linked to 
        customerId //stripe customer id
      );

        res.json({ message: "Customer created successfully", customerId });
      } catch (error) {
        console.error('Error creating customer:', error.message);
        res.status(500).send('Error creating customer');
      }
    }

   

    async function getCustomers(req, res) {
      const { stripeAccountId } = req.user;
    
      try {
        const customers = await stripe.customers.list({ limit: 50 }, { stripeAccount: stripeAccountId });
        
        const formattedCustomers = customers.data.map(customer => ({
          id: customer.id,
          name: customer.name, 
          email: customer.email,
          phone: customer.phone,
        }));
        
        res.json(formattedCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).send('Error fetching customers');
      }
    }
    
module.exports = {
 
  createCustomer,
  getCustomers,
};
