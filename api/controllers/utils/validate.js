'use strict';

// ******************************
//
// EXPORTS:
//
// ******************************

module.exports = (object) => {
  let validationErrors = object.validateSync();
  if (!validationErrors || !validationErrors.errors) {
    return false;
  }

  return {
    success: false,
    errors: Object.keys(validationErrors.errors)
      .map(errorField => {
        return {
          field: errorField,
          message: validationErrors.errors[errorField].message
        }
      })
  };
};

// ******************************