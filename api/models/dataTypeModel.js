'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DataTypeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DataType', DataTypeSchema);