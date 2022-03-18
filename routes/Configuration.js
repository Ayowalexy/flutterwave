const express = require('express');
const Router = express.Router();
const Configs = require('../controllers/Configuration');
const Compute = require('../controllers/Compute');


Router.post('/fees', Configs.CreateNewConfiguration);

Router.post('/compute-transaction-fee', Compute.ComputeTransactionFee);

module.exports = Router;