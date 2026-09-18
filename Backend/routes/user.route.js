const express = require("express");
const userRouter = express.Router();



// const { getUsers } = require("../controller/users.controller.js");
// const { addUsers } = require("../controller/users.controller.js");
// const { deleteUsers } = require("../controller/users.controller.js");
// const { updateUsers } = require("../controller/users.controller.js");
// const { login } = require("../controller/users.controller.js");

const {
    getUsers,
    addUsers,
    deleteUsers,
    updateUsers,
    register,
    login,
} = require("../controller/users.controller.js");


const { isAuthenticated } = require("../middlewares/isAuthnticated.js");
const { isAdmin } = require("../middlewares/isAuthorised.js");


userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/", getUsers);

userRouter.post("/", isAuthenticated, isAdmin, addUsers);
userRouter.delete("/:id", isAuthenticated, isAdmin, deleteUsers);
userRouter.put("/:id", isAuthenticated, isAdmin, updateUsers);


module.exports = { userRouter };
