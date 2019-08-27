'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.post('/login', UserController.login);
api.post('/register', UserController.save);

module.exports = api;