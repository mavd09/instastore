'use strict'

require('dotenv').config()

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var storeRoutes = require('./routes/store');
app.use('/store', storeRoutes);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app;