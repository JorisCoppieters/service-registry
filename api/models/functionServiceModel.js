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
let ObjectID = mongoose.Schema.Types.ObjectId;

// ******************************
//
// SCHEMA:
//
// ******************************

let FunctionServiceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  inputs: {
    items: {
      type: ObjectID,
      ref: 'DataType'
    },
    type: Array,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  metrics: {
    properties: {
      accuracy: {
        type: Number
      },
      cost: {
        type: Number
      },
      latency: {
        type: Number
      }
    },
    type: Object
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  output: {
    type: ObjectID,
    required: true,
    ref: 'DataType'
  },
  snippet: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('FunctionService', FunctionServiceSchema);