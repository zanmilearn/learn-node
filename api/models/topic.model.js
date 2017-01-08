'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var TopicSchema = new Schema({
  topicName: {
    type: String,
    default: '',
    trim: true,
    required: 'topicname cannot be blank'
  },
  topicDesc: {
    type: String,
    default: '',
    trim: true,
    required: 'topicdesc cannot be blank'
  },
  topicNodeId: {
    type: Number,
    required: true,
    unique: true
  },
  topicFont:{
    type: String
  },
  contents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Content'
    }
  ],
  parentNodeId:{
    type:Number,
    default:0
  }

});


TopicSchema.pre('remove', function(next){
    this.model('Course').update(
        {topics: this._id}, 
        {$pull: {topics: this._id}}, 
        {multi: true},
        next
    );
});

var topicmodel = mongoose.model('Topic', TopicSchema);
module.exports = topicmodel;