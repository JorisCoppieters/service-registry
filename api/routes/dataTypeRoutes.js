'use strict';

module.exports = (app) => {
  let dataType = require('../controllers/dataTypeController');

  app.route('/dataTypes')
    .get(dataType.getAll)
    .post(dataType.create);

  app.route('/dataTypes/:dataTypeId')
    .get(dataType.find)
    .delete(dataType.delete);
};
