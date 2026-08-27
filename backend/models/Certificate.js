const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true,
  },
  type: {
    type: String,
    enum: ['participation', 'winner'],
    required: true,
  },
  certificateId: {
    type: String,
    required: true,
    unique: true,
  },
  filePath: {
    type: String, // path to PDF
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Certificate', certificateSchema);