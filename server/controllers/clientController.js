const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/account');
const Customer = require('../models/customer');

async function createCustomer(req, res) {
  const { firstName, surname, email, phone } = req.body;
  const { _id, stripeAccountId } = req.user; 

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
        const customers = await stripe.customers.list({ limit: 200 }, { stripeAccount: stripeAccountId });
        
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

    async function getAllCustomersFromDB(req, res) {
      try {
       
        const customers = await Customer.find({}).lean();
    
        if (customers.length === 0) {
          return res.status(404).json({ message: 'No customers found.' });
        }
    
        const customerData = customers.map(customer => {
       
          const dateJoined = new Date(parseInt(customer._id.toString().substring(0, 8), 16) * 1000);
          
          return {
            ...customer,
            dateJoined: dateJoined.toISOString() //adding in a date joined field based on when the record was created
          };
        });
    
        res.json(customerData);
      } catch (error) {
        console.error('Error fetching customers:', error);

        res.status(500).json({ message: 'Error retrieving customers from the database.' });
      }
    }
    
    
    async function editCustomer(req, res) {
      const { customerId } = req.params;
      const { firstName, lastName, email, phone } = req.body; 
      const fullName = `${firstName} ${lastName}`; //combinig  these to make a full name for updating stripe
      const { stripeAccountId } = req.user;
    
      try {
        const updatedStripeCustomer = await stripe.customers.update(
          customerId,
          {
            name: fullName,
            email: email,
            phone: phone,
          },
          {
            stripeAccount: stripeAccountId
          }
        );
  
        const updatedDatabaseCustomer = await Customer.findOneAndUpdate(
          { stripeCustomerId: customerId },
          {
            
            name: fullName,
            email,
            phone,
          },
          { new: true } 
        );
  
        if (!updatedDatabaseCustomer) {
          return res.status(404).json({ message: "Customer not found in database" });
        }
        res.json({ message: "Customer updated successfully", updatedCustomer: updatedStripeCustomer });
      } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).send('Error updating customer');
      }
  }
  

    async function deleteCustomer(req, res) {
      const { customerId } = req.params;
      const { stripeAccountId } = req.user;
    
      try {
        await stripe.customers.del(
          customerId,
          {
            stripeAccount: stripeAccountId
          }
        );

        console.log('Customer deleted:', customerId);
       res.status(200).json({ message: 'Customer deleted successfully ', customerId});
      } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).send('Error deleting customer');
      }
    }
    
    
module.exports = {
 
  createCustomer,
  getCustomers,
  editCustomer,
  deleteCustomer,
  getAllCustomersFromDB,

};
