const {Opportunities} = require('../models/opportunities.model.js');


const createJob = (req, res) => {
  Opportunities.create(req.body)
    .then((data) => {
      console.log("data", data);
      res.json({ message: "job created successfully", data: data });
    })
    .catch((err) => {
      console.log("error when creating job", err);
      res.json({ message: "error occurred while creating job", err: err });
    });
};

const getAllJobs = (req, res) => {
  Opportunities.find({ status: 'Open' })
    .populate({ path: 'requiredSkills', model: 'skills', select: 'name skillName' })
    .populate({ path: 'preferredSkills', model: 'skills', select: 'name skillName' })
    .then((data) => {
      console.log("data", data);
      res.json({ message: "jobs fetched successfully", data: data });
    })
    .catch((err) => {
      console.log("error when fetching jobs", err);
      res.json({ message: "error occurred while fetching jobs", err: err });
    });
};


const updateJob = (req, res) => {
  Opportunities.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((data) => {
      console.log("data", data);
      if (!data) {
        return res.json({ message: "job not found", data: null });
      }
      res.json({ message: "job updated successfully", data: data });
    })
    .catch((err) => {
      console.log("error when updating job", err);
      res.json({ message: "error occurred while updating job", err: err });
    });
};


const deleteJob = (req, res) => {
  Opportunities.findByIdAndDelete(req.params.id)
    .then((data) => {
      console.log("data", data);
      if (!data) {
        return res.json({ message: "job not found", data: null });
      }
      res.json({ message: "job deleted successfully", data: data });
    })
    .catch((err) => {
      console.log("error when deleting job", err);
      res.json({ message: "error occurred while deleting job", err: err });
    });
};

module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
};