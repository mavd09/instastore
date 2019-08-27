'use strict'

require('dotenv').config()

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var storeRoutes = require('./routes/store');
app.use('/store', storeRoutes);

var userRoutes = require('./routes/user');
app.use('/user', userRoutes);

module.exports = app;