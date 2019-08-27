'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

const secretKey = process.env['SECRET_KEY'] || 'Secret key to create jwt';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        username: user.username,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    };
    return jwt.encode(payload, secretKey);
};