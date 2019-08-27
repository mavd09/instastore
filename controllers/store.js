'use strict'

var Store = require('../models/store');
var storeService = require('../service/store');

function findClosest(req, res) {
    res.status(200).send({
        message: "Ok"
    });
};

function fillDatabase() {
    new Promise((resolve, reject) => {
        storeService.findStores('soriana ciudad mexico', undefined, [], resolve, reject);
    }).then((res) => {
        res.forEach((element) => {
           var store = new Store({
            "name": element.name,
            "country": 'Mexico',
            "city": 'Ciudad de Mexico',
            "address": element.formatted_address,
            "location": {
                "lat": element.geometry.location.lat,
                "lng": element.geometry.location.lng
            },
            "opening_hours": {
                "open": 540,
                "close": 1380
            },
            "rating": element.rating
           });
           store.save();
        });
        console.log(res.length + ' stores loaded successfully!');
    }).catch((err) => {
        // TODO handle error
        console.log(err);
    });
}

fillDatabase();

module.exports = {
    findClosest
};