// const fs = require("fs");
const { printData } = require("../services/users.service.js");  // done
const { userModel } = require("../models/users.model.js");  /// make the schema







// GET

const getUsers = (req, res) => {

  userModel
    .find()
    .then((data) => {
      console.log("data", data);
      res.json({ message: "users fetched successfully", data: data });
    })
    .catch((err) => {
      console.log("error when fetchind users", err);
      res.json({ message: "error occurred while fetching users", err: err });
    });
};


// POST
const addUsers = (req, res) => {
  console.log("body", req.body); 

  userModel
    .create(req.body)
    .then(() => {
      res.json({ message: "users added successfully" });
    })
    .catch((err) => {
      console.log("error when adding users", err);
      res.json({ message: "error occurred while adding users", err: err });
    });
};

// PUT  / ubdate



// DELETE  / delete

// >>UPDATE USER >> findByIdAndUpdate
// >> DELETE USER >> findByIdAndDelete

module.exports = { getUsers, addUsers };