const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  opportunityTitle: { type: String, required: true, trim: true },
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  yearsOfExperience: { type: Number, required: true, min: 0 },
  resumeLink: { type: String, required: true, trim: true },
  coverLetter: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Rejected', 'Accepted'], default: 'Pending' },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true, collection: 'Applications' });

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application };
