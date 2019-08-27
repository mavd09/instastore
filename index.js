'use strict'

var mongoose = require('mongoose');
var app = require('./app');
const port = process.env['PORT'] || 3100;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@localhost:27017/instastore_db', { useNewUrlParser: true })
    .then(() => {
        console.log("The connection to the database 'instastore_db' was successful");
        mongoose.connection.db.listCollections({name: 'stores'})
            .next((_err, result) => {
                if (result) {
                    mongoose.connection.dropCollection('stores'); 
                }
                app.listen(port, () => {
                    console.log("The server has been initialized and it is listening on port " + port);
                });
            });
        
    })
    .catch((err) => {
        // TODO: handle errors
        console.log(err);
    });


