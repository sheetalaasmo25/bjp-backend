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
  fullName: { // Add this line
    type: String,
    
  },
  status: {  // Add status field
    type: String,
    default: 'pending',  // Default value set to 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('BJP', cardSchema);
