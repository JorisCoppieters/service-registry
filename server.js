#!/usr/bin/env node
'use strict'; // JS: ES6

// ******************************
//
// SERVICE-REGISTRY v0.1.5
//
// ******************************

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Servicedb', {
  useMongoClient: true
});

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./api/models/dataTypeModel');
require('./api/models/functionServiceModel');
require('./api/models/webServiceModel');

require('./api/routes/dataTypeRoutes')(app);
require('./api/routes/functionServiceRoutes')(app);
require('./api/routes/webServiceRoutes')(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

let port = process.env.npm_package_config_port;
app.listen(port);
