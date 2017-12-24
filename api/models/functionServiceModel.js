'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
      type: String
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
    required: true
  },
  output: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('FunctionService', FunctionServiceSchema);