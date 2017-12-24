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
}

// ******************************

function createService (req, res) {
  let newService = new Service(req.body);
  let validationErrors = validate(newService);
  if (validationErrors) {
    return res.send(validationErrors);
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
}

// ******************************

function findService (req, res) {
  Service.findById(req.params.serviceId, (err, service) => {
    if (err) {
      return res.send({ success: false, errors: [err] });
    }
    return res.json(service);
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
//
// EXPORTS:
//
// ******************************

module.exports['getAll'] = getAllServices;
module.exports['create'] = createService;
module.exports['find'] = findService;
module.exports['delete'] = deleteService;

// ******************************