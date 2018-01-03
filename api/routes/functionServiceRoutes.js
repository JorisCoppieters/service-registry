'use strict';

module.exports = (app) => {
  let functionService = require('../controllers/functionServiceController');

  app.route('/functionServices')
    .get(functionService.getAll)
    .post(functionService.create);

  app.route('/functionServices/:serviceId')
    .get(functionService.get)
    .delete(functionService.delete);
};
