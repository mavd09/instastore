'use strict'

var axios = require('axios')

const apiKey = process.env.API_KEY_GOOGLE_MAPS
const googleMapsURL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

function findStores(textSearch, pageToken, stores, resolve, reject) {
    axios.get(googleMapsURL, {
        params: {
            key: apiKey,
            input: textSearch,
            pagetoken: pageToken
        }
    }).then((res) => {
        const data = res.data;
        const nextPageToken = data.next_page_token;
        const retrievedStores = stores.concat(data.results);
        if(nextPageToken) {
            findStores(textSearch, nextPageToken, retrievedStores, resolve, reject);
        } else {
            resolve(retrievedStores);
        }
    }).catch((err) => {
        console.log(err);
        reject('Something wrong. Couldn\'t get the stores from Google Maps API');
    });
};

module.exports = {
    findStores
};