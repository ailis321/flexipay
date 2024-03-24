const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  stripePublicKey: { type: String, required: true },
  stripeSecretKey: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
