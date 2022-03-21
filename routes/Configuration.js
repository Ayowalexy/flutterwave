const express = require('express');
const Router = express.Router();
const Configs = require('../controllers/Configuration');
const Compute = require('../controllers/Compute');
const CatchAsync = require('../utils/catchAsync');


Router.post('/fees', Configs.CreateNewConfiguration);

Router.post('/compute-transaction-fee', CatchAsync(Compute.ComputeTransactionFee));

module.exports = Router;
