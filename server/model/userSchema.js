const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true, 
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

// Create model
const User = mongoose.model('User', userSchema);

// Export
module.exports = User;
