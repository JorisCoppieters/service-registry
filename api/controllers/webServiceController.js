'use strict';

// ******************************
//
// IMPORTS:
//
// ******************************

let mongoose = require('mongoose');

let dataTypes = require('./utils/dataTypes');
let validate = require('./utils/validate');

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

function getService (req, res) {
  Service.findById(req.params.serviceId, (err, service) => {
    if (err) {
      return res.send({ success: false, errors: [err] });
    }
    return res.json(service);
  });
}

// ******************************

function getAllServices (req, res) {
  Service.find({}, (err, service) => {
    if (err) {
      res.send({ success: false, errors: [err] });
    }
    res.json(service);
  });
}

// ******************************

function createService (req, res) {
  let newService = new Service(req.body);
  let validationErrors = validate(newService);
  if (validationErrors) {
    return res.send(validationErrors);
  }

  dataTypes
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
          return res.send({ success: false, errors: [err] });
        } if (!service) {
          return res.send({
            success: false
          });
        } else {
          return res.send({
            success: true,
            id: service._id
          });
        }
      });
    });
}

// ******************************

function deleteService (req, res) {
  Service.remove({
    _id: req.params.serviceId
  }, (err, service) => {
    if (err) {
      return res.send({ success: false, errors: [err] });
    }
    if (service.result.n) {
      return res.json({
        success: true,
        message: 'WebService successfully deleted' }
      );
    } else {
      return res.json({
        success: true,
        message: 'WebService not found' }
      );
    }
  });
}

// ******************************

function getServiceMetrics (req, res) {
  Service.findById(req.params.serviceId, (err, service) => {
    if (err) {
      return res.send({ success: false, errors: [err] });
    }
    return res.json(service.metrics);
  });
}

// ******************************

function updateServiceMetrics (req, res) {
  Service.findOneAndUpdate({
    _id: req.params.serviceId
  },
  {
    $set: {
      "metrics": req.body
    }
  },
  {
    new: true
  }, (err, service) => {
    if (err) {
      return res.send({ success: false, errors: [err] });
    }
    return res.json(service.metrics);
  });
}

// ******************************
//
// EXPORTS:
//
// ******************************

module.exports['get'] = getService;
module.exports['getAll'] = getAllServices;
module.exports['create'] = createService;
module.exports['delete'] = deleteService;
module.exports['getMetrics'] = getServiceMetrics;
module.exports['updateMetrics'] = updateServiceMetrics;

// ******************************