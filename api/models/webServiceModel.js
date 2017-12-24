'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
          type: Number
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
      type: String
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
  outputMappings: {
    items: {
      properties: {
        output: {
          type: Number
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
    required: true
  }
});

module.exports = mongoose.model('WebService', WebServiceSchema);