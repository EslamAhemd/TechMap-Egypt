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

  console.log("1- Login controller started");
  console.log("2- Email received:", email);

  if (!email || !password) {
    return res.status(401).json({ msg: " PLZ,ENTER EMAIL && PASSWORD" });
  }
  /////////////
  console.log("3- Searching for user in MongoDB");
  /////////////
  userModel.findOne({ email })
    .then((user) => {
      ////////
      console.log("4- MongoDB search finished");
      console.log("5- User exists:", Boolean(user));
      ////////
      if (!user) {
        return res.status(401).json({ msg: "INVALID EMAIL OR PASSWORD" });
      }


      console.log("6- Starting password comparison");
      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          //////////

          console.log("7- Password comparison finished");
          console.log("8- Password matches:", isMatch);

          //////////
          if (!isMatch) {
            console.log("9- Sending invalid password response");

            return res.status(401).json({
              message: "Invalid email or password",
              data: null
            });
          }

          const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            "Alaasecretkey267"
          );

          console.log("token:", token);

          return res.status(200).json({ msg: "U LOGGED SUCESSFULLY ", token: token });
        })
        .catch((err) => {
          console.log("error when comparing passwords", err);
          return res.json({ message: "error occurred while comparing passwords", err: err });
        });
    })
    .catch((err) => {
      console.log("error when finding user", err);
      return res.json({ message: "error occurred while finding user", err: err });
    });
};
const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required"
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message:
        "Password must contain at least 8 characters"
    });
  }

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  userModel
    .findOne({
      email: normalizedEmail
    })
    .then((existingUser) => {
      if (existingUser) {
        return Promise.reject("EMAIL_EXISTS");
      }

      return userModel.create({
        name: name.trim(),
        email: normalizedEmail,
        password: password,
        role: "JobSeeker"
      });
    })
    .then((newUser) => {
      return res.status(201).json({
        message: "User registered successfully",
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    })
    .catch((err) => {
      if (err === "EMAIL_EXISTS") {
        return res.status(409).json({
          message:
            "An account with this email already exists"
        });
      }

      console.log("Error when registering user:", err);

      return res.status(500).json({
        message:
          "An error occurred while creating the account"
      });
    });
};

const getCurrentUser = (req, res) => {
  userModel.findById(req.userSchema.id).select('-password')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }

      return res.status(200).json({ data: user });
    })
    .catch((err) => res.status(500).json({ message: 'error occurred while fetching current user', err }));
};


module.exports = { getUsers, addUsers, updateUsers, deleteUsers, login, register, getCurrentUser };