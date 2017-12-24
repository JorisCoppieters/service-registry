'use strict';

module.exports = (app) => {
  let webService = require('../controllers/webServiceController');

  app.route('/webServices')
    .get(webService.getAll)
    .post(webService.create);

  app.route('/webServices/:serviceId')
    .get(webService.find)
    .delete(webService.delete);
};
