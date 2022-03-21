const routes = require('./routes');
const CollaborationsHandler = require('./handler');
const CollaborationsService = require('../../services/CollaborationsService');
const PlaylistsService = require('../../services/PlaylistsService');
const UsersService = require('../../services/UsersService');

const usersService = new UsersService();
const collaborationsService = new CollaborationsService(usersService);
const playlistsService = new PlaylistsService();

const collaborationsPlugin = {
  plugin: {
    name: 'collaborations',
    version: '1.0.0',
    register: async (server) => {
      const collaborationsHandler = new CollaborationsHandler(collaborationsService, playlistsService);

      server.route(routes(collaborationsHandler));
    },
  },
};

module.exports = collaborationsPlugin;
