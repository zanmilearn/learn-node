'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose');
 var Course = require('./../models/course.model');


exports.createCourse = function (req, res) {
    console.log(req.swagger.params.course.value);
    var course = new Course(req.swagger.params.course.value);

    course.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(course);
        }
    });
};

exports.getAllCourses = function (req, res) {
    
    Course.find({}, function (err, courses) {
        if (err) {
            return res.status(400).send({
                message: "error"
            });
        } else {
            res.json(courses);
        }
    })
}