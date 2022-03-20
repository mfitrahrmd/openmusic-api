const { postUserValidator } = require('../../validator/users');

const routes = (handler) => [
  {
    path: '/users',
    method: 'POST',
    config: {
      validate: postUserValidator,
    },
    handler: handler.postUserHandler,
  },
];

module.exports = routes;
