const { skillModel } = require("../models/skills.model.js");

const getSkills = (req, res) => {
  skillModel
    .find()
    .then((data) => {
      console.log("data", data);
      res.json({ message: "skills fetched successfully", data: data });
    })
    .catch((err) => {
      console.log("error when fetching skills", err);
      res.json({ message: "error occurred while fetching skills", err: err });
    });
};

const addSkill = (req, res) => {
  console.log("body", req.body);
  skillModel
    .create(req.body)
    .then(() => {
      res.json({ message: "skill added successfully" });
    })
    .catch((err) => {
      console.log("error when adding skill", err);
      res.json({ message: "error occurred while adding skill", err: err });
    });
};

module.exports = { getSkills, addSkill };