'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose');
 var User = require('./../models/user.model');


// get all the users
exports.getAllUsers = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            return res.status(400).send({
                message: "error"
            });
        } else {
            res.json(users);
        }
    });
}

// get user by username
exports.getUserByUserName = function (req, res) {
    var params = req.swagger.params.payload.value;
    User.find(params, function (err, users) {
        if (err) {
            return res.status(400).send({
                message: "error"
            });
        } else {
            res.json(users);
        }
    });
}

exports.createUser = function (req, res) {
    var user = new User(req.swagger.params.payload.value);

    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(user);
        }
    });
};


exports.updateUserByUserName = function (req, res) {
    var params = req.swagger.params.payload.value;
    User.findOneAndUpdate(params.findparam, params.updateparam, function (err, user) {
        if (err) {
            return res.status(400).send({
                message: "error"
            });
        } else {
            res.json(user);
        }
    });

}

exports.updateUserByUserName = function (req, res) {
    var params = req.swagger.params.payload.value;
    User.findOneAndUpdate(params, function (err, user) {
        if (err) {
            return res.status(400).send({
                message: "error"
            });
        } else {
            res.json(user);
        }
    });

}







