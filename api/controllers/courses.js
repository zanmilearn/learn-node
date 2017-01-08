'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Course = require('./../models/course.model');
var Topic = require('./../models/topic.model');
var _ = require('lodash');




exports.createCourse = function (req, res) {

    console.log(req.swagger.params.payload.value);

    var _coursebase = req.swagger.params.payload.value;
    var _course = _.clone(_coursebase);
    _course.topics = [];

    if ((!_coursebase.topics) || _coursebase.topics.length === 0) {
        _coursebase.topics = [];
        _coursebase.topics.push({ "topicNodeId": "0" })
    }

    _coursebase.topics.forEach(function (_topic, idx, array) {
        Topic.findOne({ topicNodeId: _topic.topicNodeId }, function (err, _seltopic) {
            if (_seltopic)
                _course.topics.push(_seltopic._id);

            if (idx === array.length - 1) {
                setTimeout(3000, function () {
                    Course.findOneAndUpdate({ courseNodeId: _course.courseNodeId }, _course, { upsert: true, new: true }, function (err, course) {
                        if (err) {
                            return res.status(400).send({
                                message: err
                            });
                        } else {
                            res.json(course);
                        }
                    });
                });

            }
        });
    });


};

exports.deleteCourse = function (req, res) {

    console.log(req.swagger.params.payload.value);

    var _courseNodeId = req.swagger.params.payload.value.courseNodeId;


    Course.findOneAndRemove({ courseNodeId: _courseNodeId }, function (err, _course) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.send(_course);
        }

    });

};




exports.getAllCourses = function (req, res) {



    Course.find().populate('topics').exec(function (err, courses) {
        if (err) {
            return res.status(400).send({
                message: "error"
            });
        }
        else {
            var contentoptions = {
                path: 'topics.contents',
                model: 'Content'
            };
            Course.populate(courses, contentoptions, function (err, finalcourses) {
                res.json(finalcourses);
            });
        }
    });
};

