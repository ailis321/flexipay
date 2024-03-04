const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  firstName: { type: String, required: true },
  lastName  : { type: String, required: true },
  businessName  : { type: String, required: true },
  password: { type: String, required: true },
  businessId: { type: String },
  stripeAccountId: { type: String }, 

  });


  accountSchema.statics.register = async function(email, password, firstName, lastName, businessName, stripeAccountId) {

      // validation
      if (!email || !password) {
        throw Error('Please Provide email and password')
      }
      if (!validator.isEmail(email)) {
        throw Error('Please provide a valid email address')
      }
      //
      if (!validator.isStrongPassword(password)) {
        throw Error('Password must be at least 8 characters long and contain at least one lowercase, one uppercase, one number and one special character')
      }

      const exists = await this.findOne({ email })

      if (exists) {
        throw Error('User with this email already exists')
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)

      const user = await this.create({ email, password: hash, firstName, lastName, businessName, stripeAccountId })
      return user
}

  
  const account = mongoose.model('Account', accountSchema);
  
  module.exports = account;
  