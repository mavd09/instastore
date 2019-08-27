'use strict'

var Store = require('../models/store');
var storeService = require('../service/store');

var GeoPoint = require('geopoint');

const speedCar = 1; // 1 kilometer per minute

function findClosest(req, res) {
    var body = req.body;
    var destinyPoint = new GeoPoint(body.destination.latitude, body.destination.longitude);
    Store.find((err, stores) => {
        var closestStore = undefined;
        var bestDistance = undefined;
        stores.forEach((store) => {
            var storePoint = new GeoPoint(store.location.lat, store.location.lng);
            var currentDistance = storePoint.distanceTo(destinyPoint);
            if(bestDistance === undefined || currentDistance < bestDistance) {
                closestStore = store;
                bestDistance = currentDistance;
            }
        });
        if(closestStore === undefined) {
            res.status(404).send({
                message: 'There is no a store available. Try it later!'
            });
        } else {
            const expectedDeliveryTime = new Date(body.expectedDelivery);
            const minutesInDay = expectedDeliveryTime.getHours() * 60 + expectedDeliveryTime.getMinutes();
            const timeToDelivery = bestDistance / speedCar; // in minutes
            const deliveryTime = new Date();
            deliveryTime.setMinutes(deliveryTime.getMinutes() + timeToDelivery);
            const isOpen = 
                deliveryTime.getTime() <= expectedDeliveryTime.getTime() && 
                closestStore.opening_hours.open <= minutesInDay && minutesInDay <= closestStore.opening_hours.close;
            var nextDeliveryTime = undefined;
            if(!isOpen) {
                nextDeliveryTime = new Date();
                const toMidnight = 24 * 60 - (nextDeliveryTime.getHours() * 60 + nextDeliveryTime.getMinutes());
                nextDeliveryTime.setMinutes(nextDeliveryTime.getMinutes() + toMidnight + closestStore.opening_hours.open + timeToDelivery);
            }
            res.status(200).send({
                storeId: closestStore._id,
                storeName: closestStore.name,
                isOpen: isOpen,
                coordinates: {
                    latitude: closestStore.location.lat,
                    longitude: closestStore.location.lng
                },
                nextDeliveryTime: nextDeliveryTime
            });
        }
    });
};

function fillDatabase() {
    new Promise((resolve, reject) => {
        storeService.findStores('soriana ciudad mexico', undefined, [], resolve, reject);
    }).then((stores) => {
        stores.forEach((store) => {
           var newStore = new Store({
            "name": store.name,
            "country": 'Mexico',
            "city": 'Ciudad de Mexico',
            "address": store.formatted_address,
            "location": {
                "lat": store.geometry.location.lat,
                "lng": store.geometry.location.lng
            },
            "opening_hours": {
                "open": 540,
                "close": 1380
            },
            "rating": store.rating
           });
           newStore.save();
        });
        console.log(stores.length + ' stores loaded successfully!');
    }).catch((err) => {
        // TODO handle error
        console.log(err);
    });
}

fillDatabase();

module.exports = {
    findClosest
};