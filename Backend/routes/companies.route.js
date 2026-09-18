const express = require("express");
const companyRouter = express.Router();
const { getCompanies, addCompany } = require("../controller/companies.controller.js");

companyRouter.get("/", getCompanies);
companyRouter.post("/", addCompany);

module.exports = { companyRouter };