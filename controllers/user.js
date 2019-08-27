'use strict'

var User = require('../models/user');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('../service/jwt');

function login(req, res) {
    var body = req.body;

    var username = body.username;
    var password = body.password;

    User.findOne({username: username}, (err, user) => {
        if(err) {
            return res.status(500).send({
                message: 'Server error!' 
            });
        }
        if(user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if(check) {
                    return res.status(200).send({
                        token: jwt.createToken(user),
                        message: 'User has logged in'
                    });
                } else {
                    return res.status(404).send({
                        message: 'User has not been identified!'
                    });
                }
            });
        } else {
            return res.status(404).send({
                message: 'User has not been identified!'
            });
        }
    });
}

function save(req, res) {
    var body = req.body;
    var user = new User();
    if(body.username && body.password) {
        user.username = body.username;
        user.role = 'ROLE_USER';
        
        User.find({ username: user.username }).exec((err, users) => {
            if(err) {
                return res.status(500).send({
                    message: 'Server error!' 
                });
            }
            if(users && users.length >= 1) {
                return res.status(400).send({
                    message: 'User is already registered!'
                });
            } else {
                bcrypt.hash(body.password, null, null, (err, hash) => {
                    user.password = hash;
                    user.save();
                });
                res.status(200).send({
                    message: 'User has been registered successfully!'
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'Please send username and password'
        });
    }
}

module.exports = {
    login,
    save
};