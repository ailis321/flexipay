const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    timestamp: { type: Date, default: Date.now },
    // Other payment-related fields
  });
  
  const Payment = mongoose.model('Payment', paymentSchema);
  
  module.exports = Payment;
  