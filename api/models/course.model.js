'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var CourseSchema = new Schema({
  courseName: {
    type: String,
    default: '',
    trim: true,
    required: 'CourseName cannot be blank'
  },
  courseDesc: {
    type: String,
    default: '',
    trim: true,
    required:'CourseDesc cannot be blank'
  },
  courseType:{
    type:String,
    default:'C',
    trim:true
  }
});

var coursemodel=mongoose.model('Course', CourseSchema);
module.exports=coursemodel;