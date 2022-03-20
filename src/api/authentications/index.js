/* eslint-disable max-len */
const routes = require('./routes');
const AuthenticationsHandler = require('./handler');
const AuthenticationsService = require('../../services/AuthenticationsService');
const UsersService = require('../../services/UsersService');
const TokenManager = require('../../tokenize/TokenManager');

const authenticationsPlugin = {
  plugin: {
    name: 'authentications',
    version: '1.0.0',
    register: async (server, { authenticationsService, usersService, tokenManager }) => {
      const authenticationsHandler = new AuthenticationsHandler(authenticationsService, usersService, tokenManager);

      server.route(routes(authenticationsHandler));
    },
  },
  options: {
    authenticationsService: new AuthenticationsService(),
    usersService: new UsersService(),
    tokenManager: TokenManager,
  },
};

module.exports = authenticationsPlugin;
