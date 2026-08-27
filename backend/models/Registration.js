const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  attended: {
    type: Boolean,
    default: false,
  },
  winner: {
    type: String, // '1st', '2nd', '3rd' or null
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Registration', registrationSchema);