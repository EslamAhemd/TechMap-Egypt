const { Application } = require('../models/applications.model.js');

const createApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({ message: 'application submitted successfully', data: application });
  } catch (err) {
    res.status(400).json({ message: 'could not submit application', err });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    res.status(200).json({ data: applications });
  } catch (err) {
    res.status(500).json({ message: 'could not fetch applications', err });
  }
};

module.exports = { createApplication, getApplications };
