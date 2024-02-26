const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Feature', featureSchema);
