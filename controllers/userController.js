const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function getUserPage(req, res) {
  
  res.render('_homeLogin');
}

function getCreateCustomersPage(req, res) {
  res.render('createCustomer');
}

async function createCustomer(req, res) {
  // Extract customer information from the form submission
  const { firstName, surname, email, phone } = req.body;

  try {
    // Create a new customer in your Stripe account
    const stripeCustomer = await stripe.customers.create({
      name: `${firstName} ${surname}`,
      email: email,
      phone: phone,
    });

    // Assuming the Stripe API call is successful, retrieve the customer ID
    const customerId = stripeCustomer.id;


  //const customerId = await createCustomerInDatabase(firstName, surname, email, phone);

    // Render a success page or redirect to another page
    res.send(`Customer created successfully with ID: ${customerId}`);
  } catch (error) {
    console.error('Error creating customer:', error.message);
    res.status(500).send('Error creating customer');
  }
}

async function getCustomers(req, res) {
  try {
    const customers = await stripe.customers.list({ limit: 10 }); // Adjust the limit based on your needs
    const formattedCustomers = customers.data.map(customer => ({
      id: customer.id,
      name: customer.name, // Adjust based on your customer data
      email: customer.email,
    }));
    res.json(formattedCustomers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Error fetching customers');
  }
}


module.exports = {
  getUserPage,
  getCreateCustomersPage,
  createCustomer,
  getCustomers,
};
