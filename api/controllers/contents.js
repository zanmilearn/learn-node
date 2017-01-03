'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Content = require('./../models/content.model');



exports.createContent = function (req, res) {
    console.log(req.swagger.params.payload.value);

    var _content = req.swagger.params.payload.value;
    var content = new Content(_content);
    Content.findOneAndUpdate({ contentNodeId: _content.contentNodeId }, _content, { upsert: true, new: true },function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
        else {
            res.json(content);
        }
    });
};


exports.getAllContents = function (req, res) {

    Content.find({}, function (err, contents) {
        if (err) {
            return res.status(400).send({
                message: "error"
            });
        } else {
            res.json(contents);
        }
    });
};

exports.deleteContent = function (req, res) {

    console.log(req.swagger.params.payload.value);

    var _contentNodeId = req.swagger.params.payload.value.contentNodeId;


    Content.findOneAndRemove({ contentNodeId : _contentNodeId }, function (err,_content) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        }else{
            if(_content)
            res.send(_content)
            else
            return res.status(400).send({
                message: 'not found'
            });
        }

    });

};