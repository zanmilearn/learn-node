'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Course = require('./../models/course.model');
var fs = require('fs');


// exports.createCourse = function (req, res) {
//     console.log(req.swagger.params.course.value);
//     var course = new Course(req.swagger.params.course.value);

//     course.save(function (err) {
//         if (err) {
//             return res.status(400).send({
//                 message: err
//             });
//         } else {
//             res.json(course);
//         }
//     });
// };

exports.createCourse = function (req, res) {
    console.log(req.swagger.params.course.value);
    fs.writeFile('test.json', JSON.stringify(req.swagger.params.course.value, null, 4));
    res.json(req.swagger.params.course.value);

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