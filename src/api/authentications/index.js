/* eslint-disable max-len */
const routes = require('./routes');
const AuthenticationsHandler = require('./handler');
const AuthenticationsService = require('../../services/postgresql/AuthenticationsService');
const UsersService = require('../../services/postgresql/UsersService');
const TokenManager = require('../../tokenize/TokenManager');

const authenticationsService = new AuthenticationsService();
const usersService = new UsersService();
const tokenManager = TokenManager;

const authenticationsPlugin = {
  plugin: {
    name: 'authentications',
    version: '1.0.0',
    register: async (server) => {
      const authenticationsHandler = new AuthenticationsHandler(authenticationsService, usersService, tokenManager);

      server.route(routes(authenticationsHandler));
    },
  },
};

module.exports = authenticationsPlugin;
