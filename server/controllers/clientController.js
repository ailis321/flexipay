const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCustomer(req, res) {
  const { firstName, surname, email, phone, stripeAccountId } = req.body;

  try {
    const stripeCustomer = await stripe.customers.create({
      name: `${firstName} ${surname}`,
      email: email,
      phone: phone,
      stripeAccount: stripeAccountId 
    });

    const customerId = stripeCustomer.id;

    res.send(`Customer created successfully with ID: ${customerId}`);
  } catch (error) {
    console.error('Error creating customer:', error.message);
    res.status(500).send('Error creating customer');
  }
}


async function getCustomers(req, res) {
  try {
    const customers = await stripe.customers.list({ limit: 10 }); 
    const formattedCustomers = customers.data.map(customer => ({
      id: customer.id,
      name: customer.name, 
      email: customer.email,
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