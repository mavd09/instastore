'use strict'

var express = require('express');
var StoreController = require('../controllers/store');

var api = express.Router();

api.get('/closest', StoreController.findClosest);

module.exports = api;