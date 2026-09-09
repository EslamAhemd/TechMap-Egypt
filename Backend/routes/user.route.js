const express = require("express");
const userRouter = express.Router();



const { getUsers } = require("../controller/users.controller.js");
const { addUsers } = require("../controller/users.controller.js");
// const { deleteUsers } = require("../controller/users.controller.js");
// const { updateUsers } = require("../controller/users.controller.js");




userRouter.get("/", getUsers);
userRouter.post("/", addUsers);
// userRouter.delete("/", deleteUsers);
// userRouter.put("/", updateUsers);


module.exports = { userRouter };