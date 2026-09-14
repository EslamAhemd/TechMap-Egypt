const express = require('express');
const ooprouter = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthnticated.js');
const { isAdmin } = require('../middlewares/isAuthorised.js');

const { createJob, getAllJobs, updateJob, deleteJob } = require('../controller/opportunities.controller.js');

ooprouter.post('/', isAuthenticated, isAdmin, createJob);
ooprouter.get('/', getAllJobs);
ooprouter.put('/:id', isAuthenticated, isAdmin, updateJob);
ooprouter.delete('/:id', isAuthenticated, isAdmin, deleteJob);


module.exports = {ooprouter};