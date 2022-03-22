const ClientError = require('../exceptions/ClientError');

function errorHandler(request, h) {
  const { response } = request;

  if (response instanceof ClientError) {
    return h
      .response({
        status: 'fail',
        message: response.message,
      })
      .code(response.statusCode);
  }

  if (response.isBoom && response.isServer) {
    console.log(response);
    return h
      .response({
        status: 'error',
        message: "Sorry, we've encountered an unexpected server error. Please try again later",
      })
      .code(500);
  }

  return h.continue;
}

module.exports = errorHandler;
