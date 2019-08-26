'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@localhost:27017/instastore_db', { useNewUrlParser: true })
    .then(() => {
        console.log("The connection to the database 'instastore_db' was successful");
    })
    .catch((err) => {
        console.log(err);
    });