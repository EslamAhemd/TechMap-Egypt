const express = require("express");
const companyRouter = express.Router();
const { getCompanies, addCompany, updateCompany, deleteCompany } = require("../controller/companies.controller.js");
const { isAuthenticated } = require('../middlewares/isAuthnticated.js');
const { isAdmin } = require('../middlewares/isAuthorised.js');

companyRouter.get("/", getCompanies);
companyRouter.post("/", isAuthenticated, isAdmin, addCompany);
companyRouter.put("/:id", isAuthenticated, isAdmin, updateCompany);
companyRouter.delete("/:id", isAuthenticated, isAdmin, deleteCompany);

module.exports = { companyRouter };