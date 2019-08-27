'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = Schema({
    "store": { type: Schema.ObjectId, ref: 'Store' },
    "client": {
        "lat": Number,
        "lng": Number,
        "deliveryTime": Date
    }
});

module.exports = mongoose.model('Log', LogSchema);