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
  return h.continue;
}

module.exports = errorHandler;
