const express = require('express');
const applicationRouter = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthnticated.js');
const { isAdmin } = require('../middlewares/isAuthorised.js');
const { createApplication, getApplications } = require('../controller/applications.controller.js');

applicationRouter.post('/', isAuthenticated, createApplication);
applicationRouter.get('/', isAuthenticated, isAdmin, getApplications);

module.exports = { applicationRouter };
