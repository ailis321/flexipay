const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName  : { type: String, required: true },
  businessName  : { type: String, required: true },
  password: { type: String, required: true },
  businessId: { type: String },
  stripeAccountId: { type: String }, 

  });
  
  const account = mongoose.model('Account', accountSchema);
  
  module.exports = account;
  