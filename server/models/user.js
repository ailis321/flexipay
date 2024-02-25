const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // You should hash the passwords
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;
  