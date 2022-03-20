const { postAuthenticationValidator, putAuthenticationValidator, deleteAuthenticationValidator } = require('../../validator/authentications');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    config: {
      validate: postAuthenticationValidator,
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    config: {
      validate: putAuthenticationValidator,
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    config: {
      validate: deleteAuthenticationValidator,
    },
  },
];

module.exports = routes;
