const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  otp: {  // Updated to array of strings
    type: [String],
    required: false
  },
  phoneNumber: { // Added phoneNumber field
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('BJP', cardSchema);
