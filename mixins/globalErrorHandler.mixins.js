const { logger } = require('../helpers/loggers.helpers');

function GlobalErrorHandler(error, request, response, next) {
  const e = error;
  e.apiPath = request.path;
  // Error handling middleware functionality

  logger.error(e); // log the error

  const status = error.status || error?.response?.status || 500;
  // const jsonData = JSON.parse(JSON.stringify(error));
  // send back an easily understandable error message to the caller
  response.status(status).json({
    code: status,
    errorMessage: error.message,
    error,
    errorfields: error,
    success: false,
  });
  return next();
}

module.exports = GlobalErrorHandler;
