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

let ObjectID = mongoose.mongo.ObjectID;
let DataType = mongoose.model('DataType');
let WebService = mongoose.model('WebService');
let FunctionService = mongoose.model('FunctionService');

// ******************************
//
// FUNCTIONS:
//
// ******************************

function findDataTypes (dataTypes) {
  let promises = dataTypes
    .map(dataTypeId => {
      if (ObjectID.isValid(dataTypeId))
      {
        return DataType
          .find({ _id: dataTypeId })
          .then(results => {
            return Promise.resolve({
              dataTypeId,
              found: !!results.length
            });
          })
      } else {
        return Promise.resolve({
          dataTypeId,
          found: false
        });
      }
    });

  return Promise.all(promises);
}

// ******************************

function dataTypeInUse (dataTypeId) {
  return Promise
    .all([
      WebService
        .find({ $or: [ { output: dataTypeId }, { inputs: dataTypeId } ] })
        .then(results => results.length),

      FunctionService
        .find({ $or: [ { output: dataTypeId }, { inputs: dataTypeId } ] })
        .then(results => results.length)
    ])
    .then(results => results.reduce((a, b) => a + b))
    .then(totalResults => totalResults > 0);
}

// ******************************
//
// EXPORTS:
//
// ******************************

module.exports['find'] = findDataTypes;
module.exports['inUse'] = dataTypeInUse;

// ******************************