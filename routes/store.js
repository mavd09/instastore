'use strict'

var express = require('express');

var StoreController = require('../controllers/store');
var mdAuth = require('../middlewars/authenticate');

var api = express.Router();

api.post('/closest', mdAuth.ensureAuth, StoreController.findClosest);

module.exports = api;