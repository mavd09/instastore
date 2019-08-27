'use strict'

var express = require('express');
var StoreController = require('../controllers/store');

var api = express.Router();

api.post('/closest', StoreController.findClosest);

module.exports = api;