'use strict';

// ******************************
//
// IMPORTS:
//
// ******************************

let mongoose = require('mongoose');

let validate = require('./utils/validate');

// ******************************
//
// OBJECTS:
//
// ******************************

let DataType = mongoose.model('DataType');
let FunctionService = mongoose.model('FunctionService');
let WebService = mongoose.model('WebService');

// ******************************
//
// FUNCTIONS:
//
// ******************************

function getAllDataTypes (req, res) {
  DataType.find({}, (err, dataType) => {
    if (err) {
      res.send({ success: false, errors: [err] });
    }
    res.json(dataType);
  });
};

// ******************************

function createDataType (req, res) {
  let newDataType = new DataType(req.body);
  let validationErrors = validate(newDataType);
  if (validationErrors) {
    return res.send(validationErrors);
  }

  newDataType.save((err, dataType) => {
    if (err) {
      res.send({ success: false, errors: [err] });
    }
    res.send({
      success: true,
      id: dataType._id
    });
  });
};

// ******************************

function findDataType (req, res) {
  DataType.findById(req.params.dataTypeId, (err, dataType) => {
    if (err) {
      res.send({ success: false, errors: [err] });
    }
    res.json(dataType);
  });
};

// ******************************

function deleteDataType (req, res) {
  Promise
    .all([
      WebService
        .find({ $or: [ { output: req.params.dataTypeId }, { inputs: req.params.dataTypeId } ] })
        .then(results => results.length),

      FunctionService
        .find({ $or: [ { output: req.params.dataTypeId }, { inputs: req.params.dataTypeId } ] })
        .then(results => results.length)
    ])
    .then(results => results.reduce((a, b) => a + b))
    .then(totalResults => {
      if (totalResults > 0) {
        return res.json({ success: false, message: 'DataType is being used' });
      }

      DataType.remove({
        _id: req.params.dataTypeId
      }, (err, dataType) => {
        if (err) {
          res.send({ success: false, errors: [err] });
        }
        if (dataType.result.n) {
          res.json({
            success: true,
            message: 'DataType successfully deleted' }
          );
        } else {
          res.json({
            success: true,
            message: 'DataType not found' }
          );
        }
      });
    });
};

// ******************************
//
// EXPORTS:
//
// ******************************

module.exports['getAll'] = getAllDataTypes;
module.exports['create'] = createDataType;
module.exports['find'] = findDataType;
module.exports['delete'] = deleteDataType;

// ******************************