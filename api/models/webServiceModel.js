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

let WebServiceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  inputMappings: {
    items: {
      properties: {
        input: {
          type: ObjectID,
          ref: 'DataType'
        },
        requestDataKey: {
          type: String
        },
        requestDataValue: {
          type: String
        }
      },
      type: Object
    },
    type: Array
  },
  inputs: {
    items: {
      type: ObjectID,
      ref: 'DataType'
    },
    type: Array,
    required: true
  },
  method: {
    default: "POST",
    enum: [
      "POST",
      "GET"
    ],
    type: String,
    required: true
  },
  metrics: {
    strict: true,
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
  outputMappings: {
    items: {
      properties: {
        output: {
          type: ObjectID,
          ref: 'DataType'
        },
        responseDataKey: {
          type: String
        },
        responseDataValue: {
          type: String
        }
      },
      type: Object
    },
    type: Array
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('WebService', WebServiceSchema);