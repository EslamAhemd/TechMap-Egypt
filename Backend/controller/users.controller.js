// const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { printData } = require("../services/users.service.js");  // done
const { userModel } = require("../models/users.model.js");  /// make the schema







// GET

const getUsers = (req, res) => {

  userModel
    .find()
    .select("-password")
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
// >>UPDATE USER >> findByIdAndUpdate

const updateUsers = (req, res) => {
  userModel
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.json({ message: "user not found", data: null });
      }

      Object.assign(user, req.body);
      return user.save();
    })
    .then((data) => {
      if (!data) {
        return;
      }
      res.json({ message: "user updated successfully", data: data });
    })
    .catch((err) => {
      console.log("error when updating user", err);
      res.json({ message: "error occurred while updating user", err: err });
    });
};




// DELETE  / delete
// >> DELETE USER >> findByIdAndDelete

const deleteUsers = (req, res) => {
  userModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      console.log("data", data);
      if (!data) {
        return res.json({ message: "user not found", data: null });
      }
      res.json({ message: "user deleted successfully", data: data });
    })
    .catch((err) => {
      console.log("error when deleting user", err);
      res.json({ message: "error occurred while deleting user", err: err });
    });
};


async function hashAllPasswords() {
    const users = await User.find({});
    
    for (let user of users) {
        // التأكد إن كلمة السر مش معمول لها هاش بالفعل (مثلاً التشييك على طول الهاش)
        if (!user.password.startsWith('$2b$') && !user.password.startsWith('$2a$')) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save();
        }
    }
    console.log("Completed hashing all passwords.");
}
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ msg: " PLZ,ENTER EMAIL && PASSWORD" });
  }

  userModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ msg: "INVALID EMAIL OR PASSWORD" });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.json({ message: "invalid password", data: null });
          }
          const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            "Alaasecretkey267"
          );
          console.log("token:", token);

          res.status(200).json({ msg: "U LOGGED SUCESSFULLY ", token: token });
        })
        .catch((err) => {
          console.log("error when comparing passwords", err);
          res.json({ message: "error occurred while comparing passwords", err: err });
        });
    })
    .catch((err) => {
      console.log("error when finding user", err);
      res.json({ message: "error occurred while finding user", err: err });
    });
};


module.exports = { getUsers, addUsers, updateUsers, deleteUsers, login };