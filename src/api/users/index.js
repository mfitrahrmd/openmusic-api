const UsersHandler = require('./handler');
const UsersService = require('../../services/postgresql/UsersService');
const routes = require('./routes');

const usersService = new UsersService();

const usersPlugin = {
  plugin: {
    name: 'users',
    version: '1.0.0',
    register: async (server) => {
      const usersHandler = new UsersHandler(usersService);

      server.route(routes(usersHandler));
    },
  },
};

module.exports = usersPlugin;
