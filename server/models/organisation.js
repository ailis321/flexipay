const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  stripePublicKey: { type: String, required: true },
  stripeSecretKey: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;
