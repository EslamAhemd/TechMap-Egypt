const mongoose=require('mongoose')

const jobPostingSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company', 
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ['Entry-level', 'Mid-level', 'Senior', 'Junior','Lead'],
      required: true,
    },
    workMode: {
      type: String,
      enum: ['On-site', 'Remote', 'Hybrid'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salaryRange: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      visible: {
        type: Boolean,
        default: true,
      },
    },
    status: {
      type: String,
      enum: ['Open', 'Closed', 'Archived'],
      default: 'Open',
    },
    requiredSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    preferredSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    applicationLink: {
      type: String,
      required: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Opportunities',
  }
);


const Opportunities = mongoose.model('Opportunities', jobPostingSchema);

module.exports = {Opportunities};