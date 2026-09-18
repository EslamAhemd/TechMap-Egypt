const express = require("express");
const skillRouter = express.Router();
const { getSkills, addSkill } = require("../controller/skills.controller.js");

skillRouter.get("/", getSkills);
skillRouter.post("/", addSkill);

module.exports = { skillRouter };