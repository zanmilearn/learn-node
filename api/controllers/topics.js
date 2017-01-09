'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Topic = require('./../models/topic.model');
var Content = require('./../models/content.model');
var _ = require('lodash');




exports.createTopic = function (req, res) {
    console.log(req.swagger.params.payload.value);

    var _topicbase = req.swagger.params.payload.value;

    var _topic = _.clone(_topicbase);
    _topic.contents = [];

    if ((!_topicbase.contents) || _topicbase.contents.length === 0) {
        _topicbase.contents = [];
        _topicbase.contents.push({ "contentNodeId": "0" })
    }

    _topicbase.contents.forEach(function (_content, idx, array) {
        Content.findOne({ contentNodeId: _content.contentNodeId }, function (err, _selcontent) {

            if (_selcontent) 
                _topic.contents.push(_selcontent._id);

                if (idx === array.length - 1) {
                    setTimeout(function () {
                    Topic.findOneAndUpdate({ topicNodeId: _topic.topicNodeId }, _topic, { upsert: true, new: true }, function (err, savedtopic) {
                        if (err) {
                            return res.status(400).send({
                                message: err
                            });
                        } else {
                            if (_topicbase.topics) {
                                _topicbase.topics.forEach(function (_temptopic) {
                                    Topic.findOneAndUpdate({ topicNodeId: _temptopic.topicNodeId }, { parentNodeId: savedtopic.topicNodeId }, function (err) {
                                        if (err) {
                                            return res.status(400).send({
                                                message: "error"
                                            });
                                        }
                                    });
                                });
                            }
                            return res.status(200).send({
                                message: "success"
                            });

                        }
                    });
                    },3000);
                }
                
            
            
        });

    });





};


exports.getAllTopics = function (req, res) {

    Topic.find().populate('contents').exec(function (err, topics) {
        if (err) {
            return res.status(400).send({
                message: "error"
            });
        } else {
            res.json(topics);
        }
    })
};


exports.deleteTopic = function (req, res) {

    console.log(req.swagger.params.payload.value);

    var _topicNodeId = req.swagger.params.payload.value.topicNodeId;


    Topic.findOneAndRemove({ topicNodeId: _topicNodeId }, function (err, _topic) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.send(_topic);
        }

    });

};