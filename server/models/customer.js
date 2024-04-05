const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  stripeAccountId: { type: String, required: true }, // the stripe connect account this is linked to
  stripeCustomerId: { type: String, required: true }, // Stripe customer ID
  paymentIntents: [{ type: String }] // Array of Stripe payment intent IDs so i can link them to the customer easier
});


customerSchema.statics.createCustomer = async function(name, email, phone, accountId, stripeAccountId, stripeCustomerId) {
    try {
      const customer = new this({
        name,
        email,
        phone,
        account: accountId,
        stripeAccountId,
        stripeCustomerId
      });
      await customer.save();
      return customer;
    } catch (error) {
      throw new Error('Error creating customer: ' + error.message);
    }
  };

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
