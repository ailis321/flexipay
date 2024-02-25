const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
    stripeCustomerId: { type: String }, // Stripe customer ID
  });
  
  const Customer = mongoose.model('Customer', customerSchema);
  
  module.exports = Customer;
  