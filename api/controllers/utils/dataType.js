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
//
// EXPORTS:
//
// ******************************

module.exports['find'] = findDataTypes;

// ******************************