function customError(statusCode = 500, message = 'Internal Server Error', validationError = null) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.validationError = validationError; // Attach validation errors if any
    return error;
  }
  
  module.exports = customError;
  