'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

const secretKey = process.env['SECRET_KEY'] || 'Secret key to create jwt';

exports.ensureAuth = function(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({
            message: 'Authentication token is required'
        });
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secretKey);
        if(payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'Token expired'
            });
        }
    } catch(ex) {
        return res.status(401).send({
            message: 'Token invalid'
        });
    }
    req.user = payload;
    next();
};