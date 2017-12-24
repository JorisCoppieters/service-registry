'use strict';

// ******************************
//
// IMPORTS:
//
// ******************************

let mongoose = require('mongoose');

let validate = require('./utils/validate');
let dataType = require('./utils/dataType');

// ******************************
//
// OBJECTS:
//
// ******************************

let DataType = mongoose.model('DataType');
let Service = mongoose.model('WebService');

// ******************************
//
// FUNCTIONS:
//
// ******************************

function getAllServices (req, res) {
  Service.find({}, (err, service) => {
    if (err) {
      res.send({ success: false, errors: [err] });
    }
    res.json(service);
  });
};

// ******************************

function createService (req, res) {
  let newService = new Service(req.body);
  let validationErrors = validate(newService);
  if (validationErrors) {
    return res.send(validationErrors);
  }

  dataType
    .find(newService.inputs.concat(newService.output))
    .then(allResults => {
      let dataTypeIdsNotFound = allResults.filter(results => !results.found);
      if (dataTypeIdsNotFound && dataTypeIdsNotFound.length) {
        return res.send({
          success: false,
          errors:
            dataTypeIdsNotFound
              .map(dataTypeIdNotFound => 'Invalid data type id: ' + dataTypeIdNotFound.dataTypeId)
              .reduce((a, dataTypeIdNotFound) => a.concat(dataTypeIdNotFound), [])
        });
        return
      }
      newService.save((err, service) => {
        if (err) {
          res.send({ success: false, errors: [err] });
        }
        res.send({
          success: true,
          id: service._id
        });
      });
    })
};

// ******************************

function findService (req, res) {
  Service.findById(req.params.serviceId, (err, service) => {
    if (err) {
      res.send({ success: false, errors: [err] });
    }
    res.json(service);
  });
};

// ******************************

function deleteService (req, res) {
  Service.remove({
    _id: req.params.serviceId
  }, (err, service) => {
    if (err) {
      res.send({ success: false, errors: [err] });
    }
    if (service.result.n) {
      res.json({
        success: true,
        message: 'WebService successfully deleted' }
      );
    } else {
      res.json({
        success: true,
        message: 'WebService not found' }
      );
    }
  });
};

// ******************************
//
// EXPORTS:
//
// ******************************

module.exports['getAll'] = getAllServices;
module.exports['create'] = createService;
module.exports['find'] = findService;
module.exports['delete'] = deleteService;

// ******************************