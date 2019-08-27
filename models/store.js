'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoreSchema = Schema({
    "name": String,
    "country": String,
    "city": String,
    "address": String,
    "location": {
        "lat": Number,
        "lng": Number
    },
    "opening_hours": {
        "open": Number,
        "close": Number
    },
    "rating": Number
});

module.exports = mongoose.model('Store', StoreSchema);