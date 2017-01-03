'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ContentSchema = new Schema({
  contentName: {
    type: String,
    default: '',
    trim: true,
    required: 'ContentName cannot be blank'
  },
  contentDesc: {
    type: String,
    default: '',
    trim: true,
    required: 'ContentDesc cannot be blank'
  },
  contentNodeId: {
    type: Number,
    required: true,
    unique: true
  }
});

ContentSchema.pre('remove', function(next){
    this.model('Topic').update(
        {contents: this._id}, 
        {$pull: {contents: this._id}}, 
        {multi: true},
        next
    );
});

var contentmodel = mongoose.model('Content', ContentSchema);
module.exports = contentmodel;