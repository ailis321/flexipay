const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
  colour: {
    type: String,
    required: true
  },
  typeOfOrganisation: {
    type: String,
    required: true,
    enum: ['charity', 'nonProfitOrganisation', 'school', 'socialClub', 'sportsClub', 'other']
  },
  typeOfPaymentsToReceive: {
    type: [String],
    enum: ['donations', 'membershipFees', 'expenses', 'other'],
    required: true
  },
  customMessageForPaymentLink: {
    type: String,
    required: false
  },
  displayedBusinessName: {
    type: String,
    required: true
  },
  stripeAccountId: {
    type: String,
    required: true
  },
  businessContactNumber: {
    type: String,
    required: false
  },
  businessEmailAddress: {
    type: String,
    required: false
  },
  logo: {
    type: String,
    required: false
  }
}, { timestamps: true });

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

module.exports = UserPreferences;
