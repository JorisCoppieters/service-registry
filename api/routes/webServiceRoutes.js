'use strict';

module.exports = (app) => {
  let webService = require('../controllers/webServiceController');

  app.route('/webServices')
    .get(webService.getAll)
    .post(webService.create);

  app.route('/webServices/:serviceId')
    .get(webService.get)
    .delete(webService.delete);

  app.route('/webServices/:serviceId/metrics')
    .get(webService.getMetrics)
    .put(webService.updateMetrics);
};
