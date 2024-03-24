const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  stripeAccountId: { type: String, required: true }, // Stripe account ID
  stripeCustomerId: { type: String, required: true }, // Stripe customer ID
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
