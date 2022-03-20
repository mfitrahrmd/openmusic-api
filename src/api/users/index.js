const UsersHandler = require('./handler');
const UsersService = require('../../services/UsersService');
const routes = require('./routes');

const usersPlugin = {
  plugin: {
    name: 'users',
    version: '1.0.0',
    register: async (server, { usersService }) => {
      const usersHandler = new UsersHandler(usersService);

      server.route(routes(usersHandler));
    },
  },
  options: {
    usersService: new UsersService(),
  },
};

module.exports = usersPlugin;
