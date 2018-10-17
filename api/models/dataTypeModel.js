'use strict';

// ******************************
//
// IMPORTS:
//
// ******************************

let mongoose = require('mongoose');

// ******************************
//
// OBJECTS:
//
// ******************************

let Schema = mongoose.Schema;

// ******************************
//
// SCHEMA:
//
// ******************************

let DataTypeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DataType', DataTypeSchema);